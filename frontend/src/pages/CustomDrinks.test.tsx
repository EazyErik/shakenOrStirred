import axios, {AxiosResponse} from "axios";
import {url} from "inspector";


test("that values are rendered",async ()=> {
    jest.spyOn(axios, "post").mockImplementation((url: string, data: unknown) => {
        expect(url).toEqual("https://api.cloudinary.com/v1_1/eazyerik/image/upload")



        return Promise.resolve()

    })
})