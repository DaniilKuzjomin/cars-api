const vue = Vue.createApp({
    data(){
        return {
            carInModal: {name: null},
            cars: []
        }
    },
    async created(){
        this.cars = await (await fetch('http://localhost:8080/cars')).json();
    },
    methods: {
        getCar: async function (id){
            this.carInModal = await (await fetch(`http://localhost:8080/cars/${id}`)).json();
            let carInfoModal = new bootstrap.Modal(document.getElementById('carInfoModal'), {})
            carInfoModal.show()
        }
    }
}).mount('#app')