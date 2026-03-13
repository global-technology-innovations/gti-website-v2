import React, { useMemo, useState } from "react";
import {
  Box,
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
  Flex,
  SingleSelect,
  SingleSelectOption,
  Typography,
} from "@strapi/design-system";
import { Duplicate, ExclamationMarkCircle } from "@strapi/icons";
import {
  contentManagementUtilRemoveFieldsFromData,
  formatContentTypeData,
  useCMEditViewDataManager,
  useFetchClient,
  useNotification,
  useQueryParams,
} from "@strapi/helper-plugin";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import pluginId from "../../pluginId";

const SYSTEM_FIELDS_TO_REMOVE = [
  "createdBy",
  "updatedBy",
  "publishedAt",
  "id",
  "_id",
  "updatedAt",
  "createdAt",
];

const getLocalizationsFromData = (entity) =>
  typeof entity === "object" && entity !== null && Array.isArray(entity.localizations)
    ? entity.localizations
    : [];

const TranslateFromLocaleButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const toggleNotification = useNotification();
  const { formatMessage } = useIntl();
  const { id: currentEntityId } = useParams();
  const [{ query }] = useQueryParams();
  const { get, post } = useFetchClient();
  const { allLayoutData, layout, modifiedData, slug, isSingleType } = useCMEditViewDataManager();
  const locales = useSelector((state) => state?.i18n_locales?.locales || []);

  const defaultLocale = locales.find((locale) => locale.isDefault);
  const currentLocale = query?.plugins?.i18n?.locale || modifiedData?.locale || defaultLocale?.code;
  const hasI18nEnabled = layout?.pluginOptions?.i18n?.localized === true;

  const localizations = useMemo(() => {
    if (!currentLocale) {
      return [];
    }

    return [
      ...getLocalizationsFromData(modifiedData),
      { id: currentEntityId ?? null, locale: currentLocale, publishedAt: modifiedData?.publishedAt },
    ];
  }, [currentEntityId, currentLocale, modifiedData]);

  const options = useMemo(() => {
    return locales
      .filter(({ code }) => code !== currentLocale)
      .map((locale) => {
        const localization = localizations.find((item) => item.locale === locale.code);

        if (!localization?.id) {
          return null;
        }

        return {
          label: locale.name,
          value: localization.id,
          localeCode: locale.code,
        };
      })
      .filter(Boolean);
  }, [currentLocale, locales, localizations]);

  const [value, setValue] = useState(() => options[0]?.value || "");

  React.useEffect(() => {
    if (!value && options[0]?.value) {
      setValue(options[0].value);
    }
  }, [options, value]);

  if (!hasI18nEnabled || !currentLocale || options.length === 0) {
    return null;
  }

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleTranslate = async () => {
    const selectedOption = options.find((option) => option.value === value);

    if (!selectedOption) {
      handleToggle();
      return;
    }

    setIsLoading(true);

    try {
      const sourcePath = isSingleType
        ? `/content-manager/single-types/${slug}`
        : `/content-manager/collection-types/${slug}/${selectedOption.value}`;

      const { data: sourceEntry } = await get(sourcePath);
      const { data: translatedResponse } = await post(`/${pluginId}/translate`, {
        data: sourceEntry,
        model: layout.uid,
        sourceLocale: selectedOption.localeCode,
        targetLocale: currentLocale,
      });

      const cleanedData = contentManagementUtilRemoveFieldsFromData(
        translatedResponse.data,
        allLayoutData.contentType,
        allLayoutData.components,
        SYSTEM_FIELDS_TO_REMOVE
      );

      cleanedData.localizations = localizations;

      const formattedData = formatContentTypeData(
        cleanedData,
        allLayoutData.contentType,
        allLayoutData.components
      );

      dispatch({
        type: "ContentManager/CrudReducer/GET_DATA_SUCCEEDED",
        data: formattedData,
        setModifiedDataOnly: true,
      });

      toggleNotification({
        type: "success",
        message: {
          id: `${pluginId}.translate.success`,
          defaultMessage: "Locale translated successfully.",
        },
      });
    } catch (error) {
      toggleNotification({
        type: "warning",
        message: {
          id: `${pluginId}.translate.failure`,
          defaultMessage:
            error?.response?.data?.error?.message ||
            error?.response?.data?.message ||
            error?.message ||
            "Failed to translate locale.",
        },
      });
    } finally {
      setIsLoading(false);
      handleToggle();
    }
  };

  return (
    <Box paddingTop={2}>
      <Typography
        as="button"
        textColor="primary600"
        onClick={handleToggle}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,
          textAlign: "left",
          width: "100%",
        }}
      >
        <Flex>
          <Duplicate width="12px" height="12px" />
          {formatMessage({
            id: `${pluginId}.button.label`,
            defaultMessage: "Translate from another locale",
          })}
        </Flex>
      </Typography>

      {isOpen && (
        <Dialog onClose={handleToggle} title="Translate locale" isOpen>
          <DialogBody icon={<ExclamationMarkCircle />}>
            <Flex direction="column" alignItems="stretch" gap={4}>
              <Typography textAlign="center">
                {formatMessage({
                  id: `${pluginId}.modal.content`,
                  defaultMessage:
                    "Your current content will be overwritten with machine-translated text from the selected locale.",
                })}
              </Typography>

              <Box>
                <SingleSelect
                  label={formatMessage({
                    id: `${pluginId}.modal.locales`,
                    defaultMessage: "Locales",
                  })}
                  onChange={setValue}
                  value={value}
                >
                  {options.map((option) => (
                    <SingleSelectOption key={option.value} value={option.value}>
                      {option.label}
                    </SingleSelectOption>
                  ))}
                </SingleSelect>
              </Box>
            </Flex>
          </DialogBody>

          <DialogFooter
            startAction={
              <Button onClick={handleToggle} variant="tertiary">
                {formatMessage({
                  id: `${pluginId}.modal.cancel`,
                  defaultMessage: "Cancel",
                })}
              </Button>
            }
            endAction={
              <Button onClick={handleTranslate} loading={isLoading} variant="success">
                {formatMessage({
                  id: `${pluginId}.modal.submit`,
                  defaultMessage: "Translate",
                })}
              </Button>
            }
          />
        </Dialog>
      )}
    </Box>
  );
};

const InjectedTranslationControls = () => {
  const { layout } = useCMEditViewDataManager();
  const hasI18nEnabled = layout?.pluginOptions?.i18n?.localized === true;

  if (!hasI18nEnabled) {
    return null;
  }

  return (
    <Box paddingTop={2}>
      <TranslateFromLocaleButton />
    </Box>
  );
};

export default InjectedTranslationControls;
