import axios from 'axios';

export const dataFetcher = {
    data() {
        return {
            images: [],
            counter: 0,
            page: 1,
        }
    },
    methods: {
        fetchResults(query) {
            let resp = axios.get("https://api.unsplash.com/search/photos", {
                headers: {
                    Authorization:
                        "Client-ID 0-KXM0n7e9HsEgCEit8vVK6J0kheYc_vpj0LR7Fi9K4",
                },
                params: {
                    query,
                    page: this.page,
                    per_page: 12,
                },
            });
            this.page = this.page + 1;
            return resp;
        },
        async getNewResults() {
            let resp = await this.fetchResults(this.searchWord || 'africans');
            let results = resp.data.results;
            let start = 0;
            let size = Math.ceil(results.length / 3);
            let end = size;
            for (let i = 0; i < 3; i++) {
                // this.images.push(results.slice(start, end));
                const newResult = results.slice(start, end);
                newResult.map((result) => {
                    this.images[i].push(result);
                });
                start += size;
                end += size;
            }
        },
        async partitionResults() {
            const resp = await this.fetchResults(this.searchWord || 'africans');
            let results = resp.data.results;
            let start = 0;
            let size = Math.ceil(results.length / 3);
            let end = size;
            for (let i = 0; i < 3; i++) {
                this.images.push(results.slice(start, end));
                start += size;
                end += size;
            }
        },
        addIntersectionObserver() {
            let classes = document.querySelectorAll(".lastItem")[0];
            let observer = new IntersectionObserver((entries, self) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.getNewResults();
                        self.unobserve(entry.target);
                    }
                });
            });
            observer.observe(classes);
        }
    },
}