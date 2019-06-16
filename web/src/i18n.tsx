import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import * as React from 'react';

// noinspection JSNonASCIINames,NonAsciiCharacters
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    // debug: true,

    interpolation: {
      escapeValue: false,
    },
    resources: {
      'zh-CN': {
        translation: {
          'Home': '首页',
          'Boolean expression': '布尔表达式',
          'Results': '结果',
          'Result': '结果',
          'Variables': '变量',
          'Expression': '表达式',
          'Truth Table': '真值表',
          'Prime Implicants Chart': '素蕴含项表',
          'Binary Representation': '二进制格式',
          'Number of 1s': '1的个数',
          'Minterm': '极小项',
          'Mintermlist': '极小项列表',
          'Term has been combined or can not combine anymore': '被组合或已经无法再组合',
          'Quine–McCluskey algorithm': '奎因－麦克拉斯基算法',
          'Jump to QM minimizer': '跳转到QM最小化',

          'Estimate compares': '预估比较次数',
          'Compares': '比较次数',
          'Matches': '匹配',
          'Match': '匹配',
          'Ignore': '忽略',
          'Ignores': '忽略',
          'Resolve': '求解',
          'Minimize': '最小化',
          'Minimized': '最小化',

          'Simplified expression': '简化表达式',
          'Iterations': '迭代',
        }
      }
    },

    // https://react.i18next.com/components/i18next-instance
    react: {
      wait: true,
    },
  });

export default i18n;
