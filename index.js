import { catsData } from './data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')
const images = document.getElementById('images')



emotionRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderCat)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    memeModal.style.display = 'none'
}

function renderCat(){
    const catsObject = getCatObject()

    catsObject.forEach(catObject => {        
        images.innerHTML +=  `
            <img 
            class="cat-img" 
            src="./images/${catObject.image}"
            alt="${catObject.alt}"
            >
            `
    });
    memeModal.style.display = 'none'
}

const catsArray = getMatchingCatsArray()
console.log(catsArray)

function getCatObject(){
    if(catsArray.length > 10){
        getMultileCatObject()
    }else{
        getSingleCatObject()
    }
}
function getMultileCatObject() {
    return catsData
}

function getSingleCatObject(){

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

        if(selectedEmotion === 'all'){
            console.log('all')
            return catsData
        }
        else{

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
        
    let radioItems = 
    `
        <div class="radio">
            <label for="all">All</label>
            <input
            type="radio"
            id="all"
            value="all"
            name="emotions"
            >
        </div>
    `
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




