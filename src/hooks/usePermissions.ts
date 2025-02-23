import useLoginStore from '@/store/login/login'

function usePermissions(permissionId: string) {
  const { permissions } = useLoginStore()
  // 使用!!强制转换为boolean类型
  return !!permissions.find((item) => item.includes(permissionId))
}

export default usePermissions
