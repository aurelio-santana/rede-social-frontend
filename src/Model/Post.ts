export interface Post {
    _id: string,
    title: string,
    content: string,
    name: string,

    comment: [
        {
            _id: string;
            name: string;
            content: string;
        }
    ];
    like: string[];
    image: boolean; 

}