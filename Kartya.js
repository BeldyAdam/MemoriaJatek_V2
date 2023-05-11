class Kartya {
    #fajlnev;
    #divElem;
    #imgElem;
    #allapot;
    #blokkolt;
    constructor(fajlnev, szuloElem){
        this.#fajlnev = fajlnev;
    
        szuloElem.append(`<div class="kartya">
                                <img src="" alt="kép">
                            </div>`)
        this.#divElem = szuloElem.children("div:last-child");
        this.#imgElem = this.#divElem.find("img");
    
        this.#allapot = false;
    
        this.#setLap();
    
        this.#blokkolt = false;
        this.#divElem.on("click", () => {
            if (this.#blokkolt) {
                return;
            }
            this.#blokkolt = false;
            this.kattintas();
            this.#kattintasTrigger();
        });
        
        $(window).on("gameBlocked", () => {
            this.#blokkolt = true;
        })
    
        $(window).on("gameUnBlocked", () => {
            this.#blokkolt = false;
        })
    }


    
        #setLap(){
            if (this.#allapot) {
                this.#imgElem.attr("src", this.#fajlnev);
            }else{
                this.#imgElem.attr("src", "kepek/hatter.jpg");
            }
        }
        kattintas() {
            this.#allapot = !this.#allapot;
            this.#setLap();
        }
        #kattintasTrigger(){
            let esemeny = new CustomEvent("kartyaKattintas", {
                detail: this,
            });
            window.dispatchEvent(esemeny);
        }

        eltuntet() {
            this.#divElem.css("visibility", "hidden");
        }
        
    }

    export default Kartya;