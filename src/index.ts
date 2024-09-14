/*
 * @Version    : v1.00
 * @Author     : Wang Chao
 * @Date       : 2024-08-18 09:52
 * @LastAuthor : Wang Chao
 * @LastTime   : 2024-09-14 22:31
 * @desc       :
 */

import { basekit, FieldType, field, FieldComponent, FieldCode } from '@lark-opdev/block-basekit-server-api';
import { searchCardBin } from 'bankcard';
import { pinyin } from 'pinyin-pro';

const { t } = field;

// 通过addDomainList添加请求接口的域名
basekit.addDomainList(['api.exchangerate-api.com']);

basekit.addField({
  // 定义捷径的i18n语言资源
  i18n: {
    messages: {
      'zh-CN': {
        source: '选择待解析的字段',
        p1: '请选择文本类型字段',
        type1: '不带音调拼音',
        type2: '带音调拼音',
        type3: '拼音首字母小写',
        type4: '拼音首字母大写',
      },
      'en-US': {
        source: 'Select the field to parse',
        p1: 'Please select a text-type field',
        type1: 'Pinyin without tones',
        type2: 'Pinyin with tones',
        type3: 'Lowercase pinyin initials',
        type4: 'Uppercase pinyin initials',
      },
      'ja-JP': {
        source: '解析するフィールドを選択してください',
        p1: 'テキストタイプのフィールドを選択してください',
        type1: '声調なしのピンイン',
        type2: '声調付きのピンイン',
        type3: '小文字のピンインの頭文字',
        type4: '大文字のピンインの頭文字',
      },
    },
  },
  // 定义捷径的入参
  formItems: [
    {
      key: 'source',
      label: t('source'),
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Text],
        placeholder: t('p1'),
      },
      validator: {
        required: true,
      },
    },
  ],
  // 定义捷径的返回结果类型
  resultType: {
    type: FieldType.Object,
    extra: {
      icon: {
        light: '',
      },
      properties: [
        {
          key: 'type1',
          primary: true,
          isGroupByKey: true,
          type: FieldType.Text,
          title: t('type1'),
        },
        {
          key: 'type2',
          type: FieldType.Text,
          title: t('type2'),
        },
        {
          key: 'type3',
          type: FieldType.Text,
          title: t('type3'),
        },
        {
          key: 'type4',
          type: FieldType.Text,
          title: t('type4'),
        },
      ],
    },
  },
  // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
  execute: async (formItemParams: { source: { type: string; text: string }[] }) => {
    const { source } = formItemParams;

    // 数字类型 source 直接为值
    //  文本类型 source 为 [{ type: 'text , text '8'}]
    const sourceValue = Array.isArray(source) && source.length > 0 && source[0].text.split(' ').join('');

    try {
      return {
        code: FieldCode.Success,
        data: {
          type1: pinyin(sourceValue, { toneType: 'none' }),
          type2: pinyin(sourceValue),
          type3: pinyin(sourceValue, { pattern: 'first', separator: '' }),
          type4: pinyin(sourceValue, { pattern: 'first', separator: '' }).toUpperCase(),
        },
      };
    } catch (e) {
      return {
        code: FieldCode.Error,
      };
    }
  },
});
export default basekit;
