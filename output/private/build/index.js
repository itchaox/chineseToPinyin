"use strict";
/*
 * @Version    : v1.00
 * @Author     : Wang Chao
 * @Date       : 2024-08-18 09:52
 * @LastAuthor : Wang Chao
 * @LastTime   : 2024-09-14 22:07
 * @desc       :
 */
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const pinyin_pro_1 = require("pinyin-pro");
const { t } = block_basekit_server_api_1.field;
// 通过addDomainList添加请求接口的域名
block_basekit_server_api_1.basekit.addDomainList(['api.exchangerate-api.com']);
block_basekit_server_api_1.basekit.addField({
    // 定义捷径的i18n语言资源
    i18n: {
        messages: {
            'zh-CN': {
                source: '选择待解析的字段',
                p1: '请选择文本类型字段',
                bankName: '银行名字',
                cardType: '卡种',
            },
            'en-US': {
                source: 'Select the field to convert',
                p1: 'Please select a text field.',
                bankName: 'Bank Name',
                cardType: 'Card Type',
            },
            'ja-JP': {
                source: '変換するフィールドを選択',
                p1: 'テキストタイプのフィールドを選択',
                bankName: '銀行名',
                cardType: 'カード種別',
            },
        },
    },
    // 定义捷径的入参
    formItems: [
        {
            key: 'source',
            label: t('source'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Text],
                placeholder: t('p1'),
            },
            validator: {
                required: true,
            },
        },
    ],
    // 定义捷径的返回结果类型
    resultType: {
        type: block_basekit_server_api_1.FieldType.Object,
        extra: {
            icon: {
                light: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/abjayvoz/ljhwZthlaukjlkulzlp/2024H2/yinhangka.png?x-resource-account=public',
            },
            properties: [
                {
                    key: 'type1',
                    primary: true,
                    isGroupByKey: true,
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: '不带音调拼音',
                },
                {
                    key: 'type2',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: '带音调拼音',
                },
                {
                    key: 'type3',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: '拼音首字母小写',
                },
                {
                    key: 'type4',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: '拼音首字母大写',
                },
            ],
        },
    },
    // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
    execute: async (formItemParams) => {
        const { source } = formItemParams;
        // 数字类型 source 直接为值
        //  文本类型 source 为 [{ type: 'text , text '8'}]
        const sourceValue = Array.isArray(source) && source.length > 0 && source[0].text.split(' ').join('');
        // const res = await searchCardBin(sourceValue as string);
        try {
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: {
                    type1: (0, pinyin_pro_1.pinyin)(sourceValue, { toneType: 'none' }),
                    type2: (0, pinyin_pro_1.pinyin)(sourceValue),
                    type3: (0, pinyin_pro_1.pinyin)(sourceValue, { pattern: 'first', separator: '' }),
                    type4: (0, pinyin_pro_1.pinyin)(sourceValue, { pattern: 'first', separator: '' }).toUpperCase(),
                },
            };
        }
        catch (e) {
            return {
                code: block_basekit_server_api_1.FieldCode.Error,
            };
        }
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7O0dBT0c7O0FBRUgsbUZBQTRHO0FBRTVHLDJDQUFvQztBQUVwQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsZ0NBQUssQ0FBQztBQUVwQiwyQkFBMkI7QUFDM0Isa0NBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7QUFFcEQsa0NBQU8sQ0FBQyxRQUFRLENBQUM7SUFDZixnQkFBZ0I7SUFDaEIsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxVQUFVO2dCQUNsQixFQUFFLEVBQUUsV0FBVztnQkFDZixRQUFRLEVBQUUsTUFBTTtnQkFDaEIsUUFBUSxFQUFFLElBQUk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDUCxNQUFNLEVBQUUsNkJBQTZCO2dCQUNyQyxFQUFFLEVBQUUsNkJBQTZCO2dCQUNqQyxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFLFdBQVc7YUFDdEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLGNBQWM7Z0JBQ3RCLEVBQUUsRUFBRSxrQkFBa0I7Z0JBQ3RCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFFBQVEsRUFBRSxPQUFPO2FBQ2xCO1NBQ0Y7S0FDRjtJQUNELFVBQVU7SUFDVixTQUFTLEVBQUU7UUFDVDtZQUNFLEdBQUcsRUFBRSxRQUFRO1lBQ2IsS0FBSyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUM7WUFDbEIsU0FBUyxFQUFFLHlDQUFjLENBQUMsV0FBVztZQUNyQyxLQUFLLEVBQUU7Z0JBQ0wsV0FBVyxFQUFFLENBQUMsb0NBQVMsQ0FBQyxJQUFJLENBQUM7Z0JBQzdCLFdBQVcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO2FBQ3JCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULFFBQVEsRUFBRSxJQUFJO2FBQ2Y7U0FDRjtLQUNGO0lBQ0QsY0FBYztJQUNkLFVBQVUsRUFBRTtRQUNWLElBQUksRUFBRSxvQ0FBUyxDQUFDLE1BQU07UUFDdEIsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFO2dCQUNKLEtBQUssRUFDSCwySEFBMkg7YUFDOUg7WUFDRCxVQUFVLEVBQUU7Z0JBQ1Y7b0JBQ0UsR0FBRyxFQUFFLE9BQU87b0JBQ1osT0FBTyxFQUFFLElBQUk7b0JBQ2IsWUFBWSxFQUFFLElBQUk7b0JBQ2xCLElBQUksRUFBRSxvQ0FBUyxDQUFDLElBQUk7b0JBQ3BCLEtBQUssRUFBRSxRQUFRO2lCQUNoQjtnQkFDRDtvQkFDRSxHQUFHLEVBQUUsT0FBTztvQkFDWixJQUFJLEVBQUUsb0NBQVMsQ0FBQyxJQUFJO29CQUNwQixLQUFLLEVBQUUsT0FBTztpQkFDZjtnQkFDRDtvQkFDRSxHQUFHLEVBQUUsT0FBTztvQkFDWixJQUFJLEVBQUUsb0NBQVMsQ0FBQyxJQUFJO29CQUNwQixLQUFLLEVBQUUsU0FBUztpQkFDakI7Z0JBQ0Q7b0JBQ0UsR0FBRyxFQUFFLE9BQU87b0JBQ1osSUFBSSxFQUFFLG9DQUFTLENBQUMsSUFBSTtvQkFDcEIsS0FBSyxFQUFFLFNBQVM7aUJBQ2pCO2FBQ0Y7U0FDRjtLQUNGO0lBQ0QsMkRBQTJEO0lBQzNELE9BQU8sRUFBRSxLQUFLLEVBQUUsY0FBNEQsRUFBRSxFQUFFO1FBQzlFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxjQUFjLENBQUM7UUFFbEMsbUJBQW1CO1FBQ25CLDZDQUE2QztRQUM3QyxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyRywwREFBMEQ7UUFFMUQsSUFBSSxDQUFDO1lBQ0gsT0FBTztnQkFDTCxJQUFJLEVBQUUsb0NBQVMsQ0FBQyxPQUFPO2dCQUN2QixJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLElBQUEsbUJBQU0sRUFBQyxXQUFXLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUM7b0JBQ2hELEtBQUssRUFBRSxJQUFBLG1CQUFNLEVBQUMsV0FBVyxDQUFDO29CQUMxQixLQUFLLEVBQUUsSUFBQSxtQkFBTSxFQUFDLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDO29CQUMvRCxLQUFLLEVBQUUsSUFBQSxtQkFBTSxFQUFDLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFO2lCQUM5RTthQUNGLENBQUM7UUFDSixDQUFDO1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNYLE9BQU87Z0JBQ0wsSUFBSSxFQUFFLG9DQUFTLENBQUMsS0FBSzthQUN0QixDQUFDO1FBQ0osQ0FBQztJQUNILENBQUM7Q0FDRixDQUFDLENBQUM7QUFDSCxrQkFBZSxrQ0FBTyxDQUFDIn0=