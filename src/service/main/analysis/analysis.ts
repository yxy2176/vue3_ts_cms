// 图标数据部分
import cmsRequest from '@/service'

// 每个分类商品的个数
export function getGoodsCategoryCount() {
  return cmsRequest.get({
    url: '/goods/category/count',
  })
}

// 每个分类商品的销量
export function getAmountListSale() {
  return cmsRequest.get({
    url: '/goods/category/sale',
  })
}

// 每个分类商品的收藏
export function getGoodsCategoryFavor() {
  return cmsRequest.get({
    url: '/goods/category/favor',
  })
}

// 销量前10的商品数量
export function getGoodsSalesTop10Amount() {
  return cmsRequest.get({
    url: '/goods/sale/top10',
  })
}

// 不同城市的销量数据
export function getGoodsAddressSale() {
  return cmsRequest.get({
    url: '/goods/address/sale',
  })
}

// 商品数据统计的数量
export function getAmountListData() {
  return cmsRequest.get({
    url: '/goods/amount/list',
  })
}
