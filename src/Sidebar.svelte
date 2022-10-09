<script lang="ts">
</script>

<main>
  <div class="sidebar">
    <slot></slot>
  </div>
</main>

<style lang="scss">
  .sidebar {
    flex-direction: column;
    overflow: scroll;
    background: #f5f5f5;
    position: fixed;
    width: 250px;
    left: 0;
    top: 0;
    bottom: -15px;
    font-size: 14px;
    padding-top: 50px;
    transform: translateX(0px);
    transition: transform 0.3s 0s ease-in-out;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &:hover::-webkit-scrollbar-thumb {
      background: #cccccc;
    }
  }
</style>
