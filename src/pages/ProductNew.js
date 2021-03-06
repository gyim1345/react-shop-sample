import React, { useState } from 'react';
import productStore, { CATEGORIES } from '../stores/productStore';

function ProductNew() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState();
  const [fileName, setFileName] = useState('이미지 파일 선택');
  const [image, setImage] = useState();

  const onFileChange = (event) => {
    if (event.target.files != null && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
      setImage(event.target.files[0]);
    }
  };

  const onCategoryChange = (event) => {
    setCategory(event.target.value ? Number(event.target.value) : undefined);
  };

  const onRegister = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    productStore.createProduct({
      title,
      category,
      price,
      description,
      image
    });
  };

  return (
    <>
      <div className="container container-sm container-item-create">
        <h5 className="container-headline">중고 상품 등록</h5>

        <form className="form-item-create" onSubmit={onRegister}>
          <div className="form-group form-title">
            <input type="text" className="form-control" id="productsTitle" placeholder="제품 이름을 입력해주세요." value={title}
                   onChange={v => setTitle(v.target.value)}/>
          </div>
          <div className="form-group form-category">
            <select id="productsCategory" className="form-control" value={category} onChange={onCategoryChange}>
              <option value={undefined}>카테고리를 선택해주세요.</option>
              <option value={0}>{CATEGORIES[0]}</option>
              <option value={1}>{CATEGORIES[1]}</option>
              <option value={2}>{CATEGORIES[2]}</option>
              <option value={3}>{CATEGORIES[3]}</option>
              <option value={4}>{CATEGORIES[4]}</option>
            </select>
          </div>
          <div className="form-group form-price">
            <input type="number" className="form-control" id="productsPrice" min="0" step="1000" value={price}
                   onChange={v => setPrice(Number(v.target.value))}
                   placeholder="가격을 입력해주세요. (￦)"/>
          </div>
          <div className="form-group form-description">
            <textarea className="form-control" id="productsDescription" rows={10} value={description}
                      onChange={v => setDescription(v.target.value)}
                      placeholder="제품 설명을 작성해주세요."/>
          </div>
          <div className="form-group form-picture">
            <div className="file-box">
              <input className="upload-name" value={fileName} disabled />

              <label htmlFor="ex_filename" className="btn btn-secondary">업로드</label>
              <input type="file" id="ex_filename" className="upload-hidden" onChange={onFileChange}/>
            </div>
          </div>
          <button className="btn btn-primary btn-submit">상품 등록하기</button>
        </form>
      </div>
    </>
  );
}

export default ProductNew;
