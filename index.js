import { catsData } from './data.js'

import { emotionRadios, getImageBtn, gifsOnlyOption, images, getAllImagesBtn } from './consts.js'

let renderedCatImg = ''

emotionRadios.addEventListener('change', highlightCheckedOption)


getImageBtn.addEventListener('click', renderCat)

getAllImagesBtn.addEventListener('click', getAllImages)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function renderCat(){
    const catObject = getSingleCatObject()
    const existingImg = document.getElementById(catObject.id)

    if(!existingImg){
        images.innerHTML +=  `
            <img 
            id = ${catObject.id}
            class="cat-img" 
            src="./images/${catObject.image}"
            alt="${catObject.alt}"
            >
            `
    }else{
        console.log('hello')
    }
}

function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    
    if(catsArray.length === 1){
        return catsArray[0]
    }
    else{
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

function getMatchingCatsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray 
    }  
}

function getAllImages(){
    images.innerHTML = ''
    catsData.forEach(e => {
        images.innerHTML +=  `
            <img 
            id = ${e.id}
            class="cat-img" 
            src="./images/${e.image}"
            alt="${e.alt}"
            >
            `
    })
}

function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
        
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)