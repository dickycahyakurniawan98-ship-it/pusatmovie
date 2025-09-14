const allMovies = [
    {
        title: "Perang Kota (2025)",
        poster: "https://i.imgur.com/h006fQE.jpeg",
        videoUrl: "https://gdplayer.to/embed/?NTI3TzBMUjNIYXI3MUYrQmlrNG5haFprWFpOYTkyQ1Q4YlhyMWdrMDQyZXlKUENua3gvTmhuMFBkVHA5OHdLVDliZVhuOWdqVUpPcGNlRWVQZ29Ma3pjNG5acGlmN2lKc09mT3pNekI2cXgrcnplN2Z5WUlOTlBtelZvMHNFZHhoVkd1S3c0VEZMTTNxekZ0VUtsUEt3PT0,",
        genre: "Action,Drama,Romance",
        year: 2025,
        label: "Movie",
        rating: 6.5
    },
    {
        title: "Pabrik Gula (2025)",
        poster: "https://i.imgur.com/8EuTmDC.jpeg",
        videoUrl: "https://gdplayer.to/embed/?T0p0RUZSYjdtSWs4TzVOUlBjVGU5QzYrcHlTSmQxWEJETDFFdTN2dVAzTHpyV3ZOdC94aUtxdEpaam1xVlR5T0FWSWNuZ3RhcXpiMXhXRklmdDVwY3c3aGVvbzhTTS82U1BCaG9vOGRlemZRZ29JMnZKVjRTeVA0SlJaUUQyUVBNT3hnT1VQOVl3QSs1V3JlSmR6Nk5nPT0",
        genre: "Horror,thriller",
        year: 2025,
        label: "Movie",
        rating: 5.8
    },
    {
        title: "Pengepungan di Bukit Duri (2025)",
        poster: "https://i.imgur.com/VS0stdU.jpeg",
        videoUrl: "https://gdplayer.to/embed/?VE5PN0dQRytKYWMrVDFCc1YrdldsRGVuMzBmRjcwbjVBTFZPUGNJQ3FQUlNoamlCYXhxTGtTRmMzY1lldHB5TXJIdlZIUlhOMzl4eTFNenBacnNtQ1hxTXBianJGaGZOcmZtR2ZUTktDMXNndVF5dzcraFBMT0EzRjRxMEZ1OUY5NDhrTWg1N2NaaERLS1hLZlZLVm1RPT0,",
        genre: "Action,Drama,Crime",
        year: 2025,
        label: "Movie",
        rating: 6.6
    },
    {
        title: "Tabayyun (2025)",
        poster: "https://i.imgur.com/9rhKxZo.jpeg",
        videoUrl: "https://gdplayer.to/embed/?dldwWlpvU1g4ejhIVzRWQXZpeEdXTlVRV01MRWZXUUl5VCtmSXRJbExIdjVrZ05tYmtQMTJVWFdpcys5SVd5V24weDM3VWtBQmhSaDdNdEphT0dCV0w3YlQvVzRjbnluckRGWS9FQU1lNGdoeTVUMkd6bDcyWkU2bVlZbTd5U3ZXVzRDb2xQVXhIZ1FwbUplQ3ZGUXJBPT0,",
        genre: "Drama",
        year: 2025,
        label: "Movie",
        rating: 6.6
    },
    {
        title: "Norma: Antara Mertua dan Menantu (2025)",
        poster: "https://i.imgur.com/93UpMuD.jpeg",
        videoUrl: "https://gdplayer.to/embed/?Uzg1ZlZCMWRyMTNObjlBa0p4d0ovRm9OTGhWdysxRkV3Vm1iN0k4b2xIWkZmMVNxRFpUYk5HbjJ5VG1vRVZBcXJ0eUFkamZQOUFuZ3pyK0hDWm9vN3M5Ujh4dHZJNTNhU2RqSTl4YmJ6bWJ3YzdlRnd2NEtDd1VFYW9rUm9JelJHSzAvenZ0aVA2NVdqbjhRTnZmL2l3PT0,",
        genre: "Movie,Drama",
        year: 2025,
        label: "Movie",
        rating: 5.6
    },
    {
        title: "Purple Hearts",
        poster: "https://i.imgur.com/PDsHSIS.jpeg",
        videoUrl: "https://gdplayer.to/embed/?Rmt5cTU3S3J5cVEzdnRnMTgzSWQ2OXBZTnZBckhvOGpCWm5WekRjMzZ2TDRQTW8ycHdlWjRqMzN6R3VJcCtLd3dGaVVtSmhzK29sMldNVVNuUzl4UHpyWXFibmFtdTVycWtZMmU5cXAyN1JlZkFmYWhKY0VyRDZiRHEycDlHQjREOEhhSTJBbWdpemw2bTlkMFViQUNhNWMrRDNpWWFtakhWSjlqakJYYlBVPQ,",
        genre: "Movie,Drama,Romance",
        year: 2022,
        label: "Movie",
        rating: 6.7
    },
    {
        title: "Love Untangled (2025)",
        poster: "https://i.imgur.com/Q9n9hzw.jpeg",
        videoUrl: "https://gdplayer.to/embed/?eUxkTWVsY0ZoM2laU2lKVE9qU01ReXBSUHlZZjFWcVB2dUdodEpUdjJyTnRZUW9EZ0hlQ3BqaDVjYUZJUFdqaGJhTi9PVzFoNWVnZmk3ZFZMNE9NeUl5RVkvS0RPV1V0aWJTNnp2RGNlb05xK3pBbmpFWXZIVExEOEZWQXlVOUhoZ3RvOHFudjVhenhJbi82MU8xOEVWNU5Dcm1adXozeGdyR3BnMXIyYmYwPQ,",
        genre: "Movie,Drama,Comedy",
        year: 2025,
        label: "Movie",
        rating: 7.2
    },
    {
        title: "Heart of Stone 2023",
        poster: "https://i.imgur.com/9EZrEPX.jpeg",
        videoUrl: "https://gdplayer.to/embed/?S2I3dGtuc0ZzODJIWkNvTWcvQkY0V1VESmxJQkxmU3ZkNzVHUCt2bFBpMmtPak1QV3FueUdGSHJHQWJnTm5JUDdKUlBOTEpSYjZOQUgwQUw3TzFpNWVKZEIwL0pQUDJPbHVTV3kzMXpPZXRMVGt2eFFXTkp0UTA1QzZ4MVdBYTNackRueUZnVGhNT2JzODJQK0xBWU1iK2VTdWUwUFFucFpjS3NhOElIa0hRPQ,",
        genre: "Movie,Action,Crime",
        year: 2023,
        label: "Movie",
        rating: 5.7
    },
    {
        title: "BALERINA",
        poster: "https://i.imgur.com/TgGUJPi.jpeg",
        videoUrl: "https://gdplayer.to/embed/?bzRzMWFLZTV4R1BHeDQyZEtjSWpweDRBL0lERDdXeGZnT0wzUml0QkJBVnJHQnN6ODJHK203a0dQUmhDbkJzS3pEdk5YR0FhVmVOWGJSaTZ0OEN4YWZTS2NLRWVqbUNRTm9rbG5FQTRGOXVkMy9FeW5YNFk4U1QyaGQyTElQVGdTRGNzNWc4L3RXVUxuSXp6VWhFZjBMY3psMmZmWFcwQVNlRXM2Ykc5Vlg4PQ,",
        genre: "Movie,Action",
        year: 2023,
        label: "Movie",
        rating: 6.3
    },
    {
        title: "MAI ",
        poster: "https://i.imgur.com/MDiJpIj.jpeg",
        videoUrl: "https://gdplayer.to/embed/?SXUzRDZ2K0oxYm9qNDIrcDV3Qmo0ZDNNa21KRUFXSWQxNjBZWWd2VkxjcThVdEkrSEdGaHV2d0RRNW11SkVtbW5VTTBsdUxvMmtLeG15TEkrTTBIN0lLU2RJanI0a2dEc1dYOEVuU3pvSVZLTnBmNllicDhyaDU5MWtaMkhsNGFablFITXF1TzZJeWlXSmJkMzd3RU1MRE1QRUpVbTRRcEtIUEsveHpiZ04wPQ,",
        genre: "Movie,Drama,Romance",
        year: 2024,
        label: "Movie",
        rating: 6.8
    },
    {
        title: "MISS BALA",
        poster: "https://i.imgur.com/gozMBvs.png",
        videoUrl: "https://gdplayer.to/embed/?Z2NoN3hrMjM4MXRjbmNncnhVSllad0dyVFlPTmlnSGxPMHVEY3pZVmczZG11U2w1aWZ0ZHV4UFV4V1BxTkxPQStvU0wxeFNEMjRVdnhQZ001bkVXSFlRMEV5TEZQdmJ5Vk56bTYvaWlWVlZ3RHBCcUZtUjBZSkdUWVlkU3QvQ0hSS08yMmpUU01pSngxVEFnYWtVNzhBPT0,",
        genre: "Movie,Drama,Crime",
        year: 2019,
        label: "Movie",
        rating: 5.8
    },
    {
        title: "Rumah Untuk Alie",
        poster: "https://i.imgur.com/ZFLVKvY.png",
        videoUrl: "https://www.dailymotion.com/embed/video/x9qaxi6?autoplay=1",
        genre: "Movie,Drama",
        year: 2025,
        label: "Movie",
        rating: 5.7
    },
    {
        title: "Agak laen",
        poster: "https://i.imgur.com/d04fZOe.png",
        videoUrl: "https://www.dailymotion.com/embed/video/x9pqz88?autoplay=1,",
        genre: "Movie,Drama,Comedy",
        year: 2024,
        label: "Movie",
        rating: 7.6
    },
    {
        title: "Komang",
        poster: "https://i.imgur.com/TWBTVIz.png",
        videoUrl: "https://www.dailymotion.com/embed/video/x9q6hyg?autoplay=1,",
        genre: "Movie,Drma,Romance",
        year: 2025,
        label: "Movie",
        rating: 7.4
    },
    {
        title: "kuntilanak 3 (2022)",
        poster: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhmGbaoxhd8L40fhU59nXbBbSwnoRQhQF5QY1DvTNNH0V1ozVyhdgaKSzinobeRkCcj4CZuK8ireNwLkHDm-vYI5mIDfqOYhytPG0cHqTdpTTWY8d8UAh5up-eTq97Hc5CLpcv9N-ym4QPIg-Y_QsHOPJJZ4sdJaaV_2_p9C91i19cimpARv4sfh1AtG9c/s275/Kuntilanak3_film2022_Poster_official.jpeg",
        videoUrl: "https://www.dailymotion.com/embed/video/x8o9jtq?autoplay=1,",
        genre: "Movie,Horror,Adventure",
        year: 2022,
        label: "Movie",
        rating: 4.2
    },
        {
        title: "Asthram (2025)",
        poster: "https://i.imgur.com/u8o77dr.jpeg",
        videoUrl: "https://playdulu.xyz/embed/1gqpCNsbno1AgGb",
        genre: "Movie,Drama",
        year: 2025,
        label: "Movie",
        rating: 5.9
    },
];


