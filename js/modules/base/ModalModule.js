

export default class ModalModule{
    body = document.querySelector('body');
    modalNode = document.querySelector('.modal');
    contentNode = this.modalNode.querySelector('.modal-content')

    constructor(){
        this.modalNode.querySelector('.modal-bg').addEventListener('click', () => this.hide())
    }

    show(){
        this.setContent();
        this.body.classList.add("modal-open");
        this.modalNode.classList.add('show');
    }

    setContent(){
        console.warn('Modal content not set');
    }

    hide(){
        if(this.modalNode.classList.contains('show')){
            this.modalNode.classList.remove('show');
        }
        this.body.classList.remove("modal-open");
    }
}