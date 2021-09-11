import React, {useCallback, useRef, useState} from 'react';
import './style.css';
import { toPng } from 'html-to-image';

const ImageGenerator = () => {
    // eslint-disable-next-line no-mixed-operators
    const ref = useRef(null);

    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toPng(ref.current, { cacheBust: true, })
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = 'img.png'
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref]);

    const [form, setForm] = useState({});

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm(form=>{
            return {
                ...form,
                [name] : value
            }
        })
    }

    return (
        <div className='image-generation'>
            <div className='image-generation__form'>
                Первый юзер <input name='firstUser' onChange={onChange} value={form.firstUser || ''}/>
                Второй юзер <input name='secondUser' onChange={onChange} value={form.secondUser || ''}/>
                Счет 1 <input name='n1' type='number' onChange={onChange} value={form.n1 || ''}/>
                Счет 2 <input name='n2' type='number' onChange={onChange} value={form.n2 || ''}/>
            </div>
            <div className='image-generation__image-block'>
                <div ref={ref} className='image-generation__image'>
                    <div className='image-generation__header'>
                        WOW
                    </div>
                    <div className='image-generation__info'>
                        <div className='image-generation__user'>
                            {form.firstUser || ''}
                        </div>
                        <div className='image-generation__num'>
                            {form.n1 || ''}
                        </div>
                        <div className='image-generation__num'>
                            {form.n2 || ''}
                        </div>
                        <div className='image-generation__user'>
                            {form.secondUser || ''}
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={onButtonClick}>СОХРАНИТЬ ИЗОБРАЖЕНИЕ</button>
        </div>
    )
}
export default ImageGenerator;