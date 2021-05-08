<template>
  <div class="_header">
    <div class="_left">
      <img src="@/assets/img/logo.png" alt="" srcset="" />
    </div>
    <div class="_right">
      <span class="_name">MASIKE</span>
      <div class="_img">
        <img src="@/assets/img/user.png" alt="" srcset="" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
._header {
  padding: 14px 0;
  width: 1360px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  height: 44px;
  ._left {
    img {
      height: 48px;
    }
  }
  ._right {
    line-height: 48px;
    display: flex;
    ._name {
      font-size: 25px;
      font-family: SourceHanSansCN-Bold, SourceHanSansCN;
      font-weight: bold;
      color: #444444;
      margin-right: 22px;
    }
    ._img {
        img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
        }
      }
  }
}
</style>