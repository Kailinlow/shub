import axios, { AxiosRequestConfig } from 'axios';

async function main() {

    console.log("but how")
    const fetchConfig: AxiosRequestConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://test-share.shub.edu.vn/api/intern-test/input',
        headers: {}
    };

    const response = await axios.request(fetchConfig);
    const { token, data, query }: { token: string; data: number[]; query: { type: string; range: [number, number] }[] } = response.data;

    const n = data.length;

    const prefixSum: number[] = new Array(n + 1).fill(0);
    const evenSum: number[] = new Array(n + 1).fill(0);
    const oddSum: number[] = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        prefixSum[i + 1] = prefixSum[i] + data[i];
        evenSum[i + 1] = evenSum[i] + (i % 2 === 0 ? data[i] : 0);
        oddSum[i + 1] = oddSum[i] + (i % 2 === 1 ? data[i] : 0);
    }

    const results: number[] = query.map(({ type, range }) => {
        const [l, r] = range;

        if (type === "1") {
            console.log("1: " + (prefixSum[r + 1] - prefixSum[l]))
            return prefixSum[r + 1] - prefixSum[l];
        } else {
            const evenTotal = evenSum[r + 1] - evenSum[l];
            const oddTotal = oddSum[r + 1] - oddSum[l];
            console.log("2: " + (evenTotal - oddTotal));
            return evenTotal - oddTotal;
        }
    });

    const postConfig: AxiosRequestConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://test-share.shub.edu.vn/api/intern-test/output',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: results
    };

    axios.request(postConfig)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
}

main().catch(error => console.error("Error:", error));