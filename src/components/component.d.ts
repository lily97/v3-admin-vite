// 总页面
export interface ThePageProps {
    treeConfig?: Object,
    searchGroupConfig?: Object,
    operationConfig?: Array<{}>,
    tableConfiger?: Object,
    paginationConfig?: Object,
    editFormConfig?: Object
}

// 树状图
export interface TreeProps {
    title?: string,// 树标题
    hasSearch?: boolean | true,// 是否展示搜索框
    defaultIcon?: string,// 默认图标
    treeData?: Array<{}>, // 树数据
    showExpend?: boolean,//是否显示展开折叠按钮
    showCheckBox?: boolean,// 是否显示复选框
    defaultChecked?: Array<number>,// 复选框默认选中项
    showLine?: boolean,// 是否显示线条
    lineStyle?: string,// 线条风格 
}

export interface WithTreeProps {
    treeData: () => [],
    defaultChecked: () => [],
    hasSearch: true,
    showExpend: true,
    showCheckBox: true,
    showLine: true,
}

// 顶部搜索组
export interface SearchGroupProps {
    searchList?: Array<{
        label: string, type: string, prop: string,
        data?: Array<{ value: number, label: string }>,
        multiple?: boolean | undefined
        dateType?: "date" | "year" | "month" | "dates" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange"
    }>
}


// 操作组
export interface OperateGroupProps {
    operationConfig: any
}



