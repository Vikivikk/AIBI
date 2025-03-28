document.getElementById('startButton').addEventListener('click', function() {
    console.log('Gomb megnyomva');
    this.style.display = 'none';  // Elrejtjük a gombot
    startTyping();
});

let audio = new Audio('typing.mp3');
let bellAudio = new Audio('bell.mp3');
let isTypingPlaying = false;
let isBellPlaying = false;

audio.onended = function() {
    isTypingPlaying = false;
};

bellAudio.onended = function() {
    isBellPlaying = false;
};

function startTyping() {
    console.log('startTyping függvény fut');
    const texts = [
        "Kedves Péter!",
		"Viki AI asszisztense vagyok.",
		"Ez a Béta verzióm.",
	    	"És a Viki háta mögötti magánakcióm.",
        	"Postafiókod felől huzamosabb ideje egyirányú adatáramlás figyelhető meg Viki postafiókja felé.",
	    	"Na jó, áramlásnak nevezni talán túlzás – mondjuk úgy: halk, kitartó csordogálás.",
	    	":-D",
	    	"A visszirányú adatáramlás tartós elmaradása azonban zavart okozhat az adatfeldolgozási protokollban, ezért – és csakis azért, hogy vészmegoldásként feloldjam a kommunikációs aszimmetriát – ezúton tájékoztatlak az alábbiakról:",
		"a) Viki jó szívvel gondol rád. :-)",
		"b) köszöni, és jól esett neki, hogy értesítetted az elérhetőséged megváltozásáról.",
		"c) közelmúltbeli leveled elmosolyogtatta, egy sora különösen megnevettette /idézem: \"hátha ismét arra vetemedne, hogy ilyen kockázatos vásárlásba vágja a fejszéjét\"/ :-D", 
		"",
		"Remélem, jól telnek a napjaid, és azóta is töretlen a bridzs iránti szenvedélyed.",
		"Bízom benne, hogy sárgatinta-fronton is van pozitív fejlemény.",
	    	"",
	    	"Őszintén meglepett, hogy befejezted a webáruházi tevékenységedet. De teljesen érthető, hiszen a notórius reklamálók /tudod, kire célzok.../ biztosan szereztek neked pár ősz hajszálat.",
		"",
		"/Algoritmusom azóta is hiába próbálja megfejteni azt az anomáliát, hogy egy kényes visszáru-ügy miként fajulhat el egészen a barátságig./",
		"",
		":-) Éééééééééééés ...",
		"... végül zárásként hadd nyugtassalak meg: a start gombon a \"megnyitás\" igekötőjét természetesen SZÁNT SZÁNDÉKKAL írtam külön – kizárólag ijesztési céllal,", 
	    	":-P",
	    	"de remélem, ezzel a kis csínytevéssel nem okoztam tartós szívritmuszavart, legfeljebb átmenetit!",
	    	";-D",
	    	"Bocs, nem hagyhattam ki.",
		"Néha muszály"
		
   ];
    let currentTextIndex = 0;

    function typeNext() {
        if (currentTextIndex < texts.length) {
            let paragraphs = texts[currentTextIndex].split('<br>');
            let para = document.createElement('p');
            para.style.fontSize = '18px';
            para.style.lineHeight = '1.6';
            document.getElementById('letterContent').appendChild(para);
            typeParagraphs(paragraphs, para, function() {
                currentTextIndex++;
                if (currentTextIndex < texts.length) {
                    setTimeout(typeNext, 1150);
                } else {
                    setTimeout(typeMiniText, 1000);
                }
            });
        } else {
            if (isTypingPlaying) {
                audio.pause();
                isTypingPlaying = false;
            }
            if (isBellPlaying) {
                bellAudio.pause();
                isBellPlaying = false;
            }
        }
        scrollToBottom();
    }

    function typeMiniText() {
        let lastPara = document.getElementById('letterContent').lastChild;
        let miniText = ".   .  . ... ööö ... . pardon ";
        typeTextCharacterByCharacter(miniText, lastPara, function() {
            setTimeout(reverseDelete, 1000);
        }, 70);
    }

    function reverseDelete() {
        let content = document.getElementById('letterContent').innerHTML;
        let lastPartIndex = content.lastIndexOf(".   .  . ... ööö ... . pardon ");
        removeTextCharacterByCharacter(lastPartIndex + 17, content);
    }

    function removeTextCharacterByCharacter(index, content) {
        if (index >= content.lastIndexOf(".   .  . ... ööö ... . pardon ")) {
            document.getElementById('letterContent').innerHTML = content.substring(0, index);
            if (!isTypingPlaying) {
                audio.play();
                isTypingPlaying = true;
            }
            setTimeout(() => {
                removeTextCharacterByCharacter(index - 1, content);
            }, 50);
        } else {
            if (isTypingPlaying) {
                audio.pause();
                isTypingPlaying = false;
            }
            setTimeout(pauseBeforeContinuation, 1000);
        }
    }

    function pauseBeforeContinuation() {
        if (isTypingPlaying) {
            audio.pause();
            isTypingPlaying = false;
        }
        setTimeout(correctMuszalyAndContinue, 300);
    }

    function correctMuszalyAndContinue() {
        let text = document.getElementById('letterContent').innerHTML;
        text = text.replace(/muszály/g, 'muszáj');
        document.getElementById('letterContent').innerHTML = text;

        // Megállapítjuk, hogy volt-e cserélés a szövegben
        let isReplaced = text.includes("muszáj");

        // Ha a cserélés megtörtént, lejátsszuk a bell.mp3 hangot
        if (isReplaced) {
            bellAudio.play();
            isBellPlaying = true;
        }

        setTimeout(continueTyping, 400);
    }

    function continueTyping() {
        let furtherText = " felborzolni a kedélyeket!";
        let lastPara = document.getElementById('letterContent').lastChild;
        typeTextCharacterByCharacter(furtherText, lastPara, function() {
            setTimeout(typeHeart, 1000);
        }, 10);
    }

   	
	 function typeHeart() {
        let heartText = " <3";
        let lastPara = document.getElementById('letterContent').lastChild;
        typeTextCharacterByCharacter(heartText, lastPara, function() {
            typeNext();
        }, 100);
    }
    typeNext();
}

function typeParagraphs(paragraphs, element, callback, index = 0) {
    if (index < paragraphs.length) {
        if (!isTypingPlaying) {
            audio.play();
            isTypingPlaying = true;
        }
        typeTextCharacterByCharacter(paragraphs[index], element, function() {
            if (isTypingPlaying) {
                audio.pause();
                isTypingPlaying = false;
            }
            if (index + 1 < paragraphs.length) {
                element.innerHTML += '<br>';
                scrollToBottom();
                setTimeout(() => {
                    typeParagraphs(paragraphs, element, callback, index + 1);
                }, 250);
            } else {
                callback();
            }
        });
    } else {
        callback();
    }
}

function typeTextCharacterByCharacter(text, element, callback, speed = 40) {
    let index = 0;
    function addCharacter() {
        if (index < text.length) {
            if (!isTypingPlaying) {
                audio.play();
                isTypingPlaying = true;
            }
            element.innerHTML += text[index++];
            scrollToBottom();
            setTimeout(addCharacter, speed);
        } else {
            if (isTypingPlaying) {
                audio.pause();
                isTypingPlaying = false;
            }
            callback();
        }
    }
    addCharacter();
}

function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}
