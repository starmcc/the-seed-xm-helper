const tipsJson = document.getElementById('tipsJson').data
const converter = OpenCC.Converter({ from: 'cn', to: 'tw' })


document.getElementById('tipsInput').addEventListener('keydown', event => {
    if (event.code !== 'Enter') {
        return
    }
    searchTips()
})

function tipsInit(clearInput) {
    let input = document.getElementById('tipsInput')
    if (clearInput) {
        input.value = ''
    }
    let div = document.getElementById('tipsData')
    div.innerHTML = ''
    return {
        div,
        value: converter(input.value)
    }
}

function searchTips() {
    let tipsData = tipsInit(false)
    let div = tipsData.div
    console.info(tipsData.value)
    if (tipsData.value === '') {
        div.innerHTML = '<p style="color: red;">暂无结果</p>'
        return
    }
    let searchStatus = false
    for (const tips of tipsJson) {
        let is = searchByInitials(tipsData.value, tips.tips) || tips.tips.indexOf(tipsData.value) != -1
        if (!is) {
            continue
        }
        searchStatus = true
        let h3 = document.createElement('h3')
        h3.innerText = tips.map
        div.appendChild(h3)
        let p1 = document.createElement('p')
        p1.innerText = tips.tips
        div.appendChild(p1)
        // 复制地图名
        copyData(tips.map)
        break
    }

    if (!searchStatus) {
        div.innerHTML = '<p style="color: red;">暂无结果</p>'
        return
    }
}



const qaJson = document.getElementById('qaJson').data

document.getElementById('qName').addEventListener('keydown', event => {
    if (event.code !== 'Enter') {
        return
    }
    queryQa()
})

function qaInit(clearInput) {
    let input = document.getElementById('qName')
    if (clearInput) {
        input.value = ''
    }
    let div = document.getElementById('qaData')
    div.innerHTML = ''
    return {
        div,
        value: converter(input.value)
    }
}

function queryQa() {
    let qaData = qaInit(false)
    let div = qaData.div
    if (qaData.value === '') {
        div.innerHTML = '<p style="color: red;">暂无结果</p>'
        return
    }
    let searchStatus = false
    for (const qa of qaJson) {
        let is = searchByInitials(qaData.value, qa.q) || qa.q.indexOf(qaData.value) != -1
        if (!is) {
            continue
        }
        searchStatus = true
        let p1 = document.createElement('p')
        p1.innerText = qa.q
        div.appendChild(p1)
        for (let i = 0; i < qa.a.length; i++) {
            let a = qa.a[i]
            let blok = document.createElement('div')
            blok.className = "a_div"
            for (let j = 0; j < a.val.length; j++) {
                let p2 = document.createElement('p')
                p2.innerText = a.val[j]
                if (a.a == j + 1) {
                    p2.style = 'color:red;'
                }
                blok.appendChild(p2)
            }
            div.appendChild(blok)
            if ((i + 1) % 3 === 0) {
                div.appendChild(document.createElement('br'))
            }
        }
        div.appendChild(document.createElement('hr'))

    }

    if (!searchStatus) {
        div.innerHTML = '<p style="color: red;">暂无结果</p>'
        return
    }
}


function btnClick(num, th) {
    let audio = document.getElementById("audio_bgm")
    audio.src = "bgm/" + num + ".mp3"
    audio.play()
    copyData(th.innerText)
}


function searchByInitials(initials, data) {
    const query = initials.trim().toUpperCase()
    let py = pinyin.getCamelChars(data)
    return py.indexOf(query) != -1
}


function copyData(data) {
    const input = document.createElement('input')
    input.setAttribute('readonly', 'readonly')
    input.setAttribute('value', data)
    document.body.appendChild(input)
    input.setSelectionRange(0, 9999)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
}