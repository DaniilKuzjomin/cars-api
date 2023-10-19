const vue = Vue.createApp({
    data(){
        return {
            carInModal: { name: null },
            cars: [],
            newCar: { name: '', since: '' }
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
        },
        DeleteCar: async function (id) {
            await fetch(`http://localhost:8080/cars/${id}`, {
                method: 'DELETE'
            });
            this.cars = await (await fetch('http://localhost:8080/cars')).json();
        },
        AddCar: async function () {

            await fetch('http://localhost:8080/cars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.newCar)
            });
    
            this.newCar.name = '';
            this.newCar.since = '';
    
            this.cars = await (await fetch('http://localhost:8080/cars')).json();
    
            this.carInModal = { ...this.newCar };
        },
        EditCarModal: async function (){
            let carEditModal = new bootstrap.Modal(document.getElementById('carEditModal'), {});
            carEditModal.show();
        },
        EditCar: async function () {
            await fetch(`http://localhost:8080/cars/${this.carInModal.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.carInModal.name,
                    since: this.carInModal.since
                })
            });
        
            this.cars = await (await fetch('http://localhost:8080/cars')).json();
        }                
    }
}).mount('#app');
