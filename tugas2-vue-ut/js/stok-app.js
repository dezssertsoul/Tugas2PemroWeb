// Logika Vue.js untuk Halaman Stok Bahan Ajar

const rawData = typeof app !== 'undefined' && app.data 
    ? app.data 
    : { stok: [], upbjjList: [], kategoriList: [] }; 

var app = new Vue({
    el: '#app', 
    data: {
        stok: rawData.stok,
        upbjjList: rawData.upbjjList,
        kategoriList: rawData.kategoriList,
        
        filter: {
            upbjj: '',
            kategori: '',
            search: ''
        },
        watchStatus: 'Menunggu perubahan filter...' // Indikator 1.5 Watcher
    },
    
    //Computed Property
    computed: {
        filteredStok() {
            let filtered = this.stok;

            if (this.filter.upbjj) {
                filtered = filtered.filter(item => item.upbjj === this.filter.upbjj);
            }
            if (this.filter.kategori) {
                filtered = filtered.filter(item => item.kategori === this.filter.kategori);
            }
            if (this.filter.search) {
                const searchLower = this.filter.search.toLowerCase();
                filtered = filtered.filter(item => 
                    item.judul.toLowerCase().includes(searchLower) ||
                    item.kode.toLowerCase().includes(searchLower)
                );
            }
            return filtered;
        },
        computedStokCount() {
            return this.stok.length;
        }
    },
    
    //Methods Property
    methods: {
        formatRupiah(number) {
            const num = typeof number === 'string' ? parseFloat(number) : number;
            if (isNaN(num)) return '0';
            return new Intl.NumberFormat('id-ID').format(num);
        },
        isLowStock(qty, safety) {
            return qty <= safety; // Conditional logic for styling
        },
        resetFilters() {
            this.filter.upbjj = '';
            this.filter.kategori = '';
            this.filter.search = '';
            this.watchStatus = 'Filter telah di-reset!'; // Watcher trigger
        }
    },
    
    //Watchers
    watch: {
        // Watcher 1
        'filter.upbjj'(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.watchStatus = `Filter UPBJJ diubah menjadi: ${newVal || 'Semua UPBJJ'}`;
            }
        },
        // Watcher 2
        'filter.search'(newVal, oldVal) {
            if (newVal !== oldVal) {
                if (newVal.length >= 3) {
                    this.watchStatus = `Mulai mencari untuk: "${newVal}"`;
                } else if (newVal.length === 0 && oldVal.length > 0) {
                    this.watchStatus = `Pencarian dibersihkan.`;
                } else {
                    this.watchStatus = 'Menunggu input pencarian (min 3 karakter untuk update watcher)';
                }
            }
        }
    }
});