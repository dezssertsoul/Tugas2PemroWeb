// Ambil data mentah dari dataBahanAjar.js
const rawData = app.data; 

const trackingApp = new Vue({
    el: '#app',
    data: {
        trackingData: rawData.tracking,
        paketData: rawData.paket,
        
        doNumber: '',  // Input dari user (v-model)
        activeDo: null, // DO yang sedang dicari
        doResult: null // Hasil tracking
    },
    
    //Methods Property
    methods: {
        formatRupiah(number) {
            return new Intl.NumberFormat('id-ID').format(number);
        },
        
        getPackageName(kode) {
            const paket = this.paketData.find(p => p.kode === kode);
            return paket ? paket.nama : kode;
        },

        trackDO() {

            const searchDo = this.doNumber.trim().toUpperCase();
            
            
            this.activeDo = searchDo;
            
            
            if (this.trackingData[searchDo]) {
                // DO ditemukan
                this.doResult = this.trackingData[searchDo];
            } else {
                // DO tidak ditemukan
                this.doResult = null;
            }
        }
    }
});