// 获取所有包含 class 为 "scroll-link" 的链接
var scrollLinks = document.querySelectorAll('.scroll-link')

// 对每个链接添加点击事件处理程序
scrollLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
        // 取消默认行为（跳转）
        event.preventDefault()

        // 获取目标元素的 ID
        var targetId = this.getAttribute('href')

        // 获取目标元素
        var targetElement = document.querySelector(targetId)

        // 使用 scrollIntoView() 方法滚动到目标元素
        targetElement.scrollIntoView({ behavior: 'smooth' })
    })
})



const imgs = document.querySelectorAll('.image')
const fullscreenOverlay = document.querySelector('.fullscreen-overlay')
imgs.forEach(img => {
    img.addEventListener('click', function () {
        fullscreenOverlay.style.display = 'flex'
        let image = document.querySelector('.fullscreen-img')
        image.src = img.src
    })
})


fullscreenOverlay.addEventListener('click', function () {
    fullscreenOverlay.style.display = 'none'
})
