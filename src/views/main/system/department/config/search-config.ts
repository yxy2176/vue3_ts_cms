const searchConfig = {
  formItems: [
    {
      type: 'input',
      label: '部门名称',
      prop: 'name',
      placeholder: '请输入查询的部门名称',
    },
    {
      type: 'input',
      label: '部门领导',
      placeholder: '请输入查询的领导名称',
      prop: 'leader',
    },
    {
      type: 'date-picker',
      label: '创建时间',
      prop: 'createAt',
    },
  ],
}

export default searchConfig
