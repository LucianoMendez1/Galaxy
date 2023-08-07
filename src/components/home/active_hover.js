
const active_hover = () => {

    const link_button1 = document.querySelector(".link_button1")
    const link_button2 = document.querySelector(".link_button2")
    const link_button3 = document.querySelector(".link_button3")
    const link_button1_act = document.querySelector(".link_button1_active")
    const bar_link_button = document.querySelector(".bar_link_button")
    const bar_link_button1 = document.querySelector(".bar_link_button1")


    
    link_button1.addEventListener("mouseover" , function(){
        link_button1.classList.add("link_button_active")
        link_button2.classList.remove("link_button_active")
        link_button3.classList.remove("link_button_active")

        bar_link_button.classList.add("bar_link_button_active1")
        bar_link_button.classList.remove("bar_link_button_active2")
        bar_link_button.classList.remove("bar_link_button_active3")

        link_button1_act.classList.remove("link_button1_active")
        bar_link_button1.classList.remove("bar_link_button1")
    })

    link_button2.addEventListener("mouseover" , function(){
        link_button2.classList.add("link_button_active")
        link_button1.classList.remove("link_button_active")
        link_button3.classList.remove("link_button_active")

        bar_link_button.classList.add("bar_link_button_active2")
        bar_link_button.classList.remove("bar_link_button_active1")
        bar_link_button.classList.remove("bar_link_button_active3")

        link_button1_act.classList.remove("link_button1_active")
    })

    link_button3.addEventListener("mouseover" , function(){
        link_button3.classList.add("link_button_active")
        link_button1.classList.remove("link_button_active")
        link_button2.classList.remove("link_button_active")

        bar_link_button.classList.add("bar_link_button_active3")
        bar_link_button.classList.remove("bar_link_button_active2")
        bar_link_button.classList.remove("bar_link_button_active1")

        link_button1_act.classList.remove("link_button1_active")

    })


}

export default active_hover;