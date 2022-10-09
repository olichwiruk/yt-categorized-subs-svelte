<script lang="ts">
  let active = true
  const toogleSidebar = () => {
    active = !active
  }
</script>

<main>
  <div class="sidebar">
    <div
      class="sidebar__box"
      class:sidebar__box--active="{active}"
    >
      <button
        class="hamburger hamburger--active"
        class:hamburger--active="{active}"
        on:click="{toogleSidebar}"
      >
        <span class="hamburger__box">
          <span class="hamburger__inner"></span>
        </span>
      </button>

      <div
        class="content"
        class:content--active="{active}"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</main>

<style lang="scss">
  .sidebar {
    z-index: 99;
    left: 0;
    top: 0;
    position: fixed;

    &__box {
      display: inline-block;
      position: relative;
      background: #f5f5f5;
      width: 0px;
      height: 100vh;
      transition: width 0.3s 0s ease-in-out;
    }

    &__box--active {
      width: 250px;
    }
  }

  .content {
    flex-direction: column;
    overflow: scroll;
    position: absolute;
    height: calc(100% - 50px);
    width: 250px;
    font-size: 14px;
    padding-top: 10px;
    transform: translateX(-250px);
    transition: transform 0.3s 0s ease-in-out;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &:hover::-webkit-scrollbar-thumb {
      background: #cccccc;
    }

    &--active {
      transform: translateX(0px);
    }
  }

  .hamburger {
    z-index: 999;
    position: relative;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    margin: 0;
    transform: translateX(0px);
    transition: transform .3s 0s ease-in-out;

    &:focus{
      outline: 0;
    }

    &--active {
      transform: translateX(100px);
      position: relative;
    }

    &__box {
      height: 30px;
      width: 30px;
      display: inline-block;
      position: relative;
    }

    &__inner {
      width: 100%;
      height: 3px;
      background-color: #171717;
      position: absolute;

      left: 0;
      top: 50%;
      transform: translateY(-50%);
      transition: background-color .3s 0s ease-in-out;
    }

    &__inner:before,
    &__inner:after {
      content: '';
      width: 100%;
      height: 3px;
      background-color: #171717;
      position: absolute;
      left: 0;
      transition: transform .4s 0s ease-in-out;
    }

    &__inner:before {
      top: -10px;
    }
    &__inner:after {
      top: 10px;
    }

    &--active &__inner {
      background-color: transparent;
    }

    &--active &__inner:before {
      transform: translateY(10px) rotate(45deg);
    }

    &--active &__inner:after {
      transform: translateY(-10px) rotate(-45deg);
    }
  }
</style>
