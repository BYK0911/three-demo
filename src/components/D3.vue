<template>
  <div class="container">
    <canvas ref='canvas'></canvas>
  </div>
</template>

<script>
import * as Three from 'three'

export default {
  data () {
    return {
      renderer: null,
      scene: null,
      camera: null,
      light: null
    }
  },

  mounted () {
    this.renderer = new Three.WebGLRenderer({ canvas: this.$refs.canvas })
    this.renderer.shadowMap.enabled = true
    this.scene = new Three.Scene()
    this.scene.background = new Three.Color('black')
    this.createCamera()
    this.createLight()

    this.init()

    requestAnimationFrame(this.render.bind(this))
  },

  methods: {
    init () {

    },

    createCamera (fov = 40, aspect = 2, near = 0.1, far = 100) {
      const camera = this.camera = new Three.PerspectiveCamera(fov, aspect, near, far)
      camera.position.set(0, 10, 20)
      camera.lookAt(0, 0, 0)
    },

    createLight (color = 0xFFFFFF, indensity = 1) {
      const light = this.light = new Three.DirectionalLight(color, indensity)
      light.castShadow = true
      light.position.set(0, 10, 0)
      light.target.position.set(-5, 0, -5)
      light.shadow.camera.left = -20
      light.shadow.camera.right = 20
      light.shadow.camera.top = 20
      light.shadow.camera.bottom = -20
      light.shadow.camera.near = 0.1
      light.shadow.camera.far = 30

      this.scene.add(light)
      this.scene.add(light.target)
    },

    render (time) {
      const canvas = this.renderer.domElement
      const pixelRatio = window.devicePixelRatio
      const width = canvas.clientWidth * pixelRatio | 0
      const height = canvas.clientHeight * pixelRatio | 0

      this.renderer.setSize(width, height, false)
      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()

      if (this.beforeRender) this.beforeRender(time)

      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.render.bind(this))
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
canvas {
  width: 100%;
  height: 100%;
}
</style>
