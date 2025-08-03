import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../app/store';
import { createDocument, fetchDocuments } from '../app/features/document/documentSlice';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { documents } = useSelector((state: RootState) => state.document);

  useEffect(() => {
    
    if (documents.length === 0) {
      dispatch(fetchDocuments());
    }
  }, [dispatch, documents.length]);
  
  const handleSave = async () => {
    try {
      const newDoc = await dispatch(createDocument()).unwrap();
      navigate(`/documents/${newDoc.id}`);
    } catch (error) {
      console.error('Failed to create document:', error);
    }
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Collaborative Document Editor</h1>
        <button
          className="btn btn-primary px-4 py-2 fw-semibold shadow-sm mt-3"
          onClick={handleSave}
        >
          + Create Document
        </button>
      </div>

      <div className="row">
        {documents.map((doc) => (
          <div key={doc.id} className="col-md-6 col-lg-4 mb-4">
            <div
              className="p-4 border rounded shadow-sm bg-white h-100"
              style={{ cursor: 'pointer', minHeight: '200px' }}
              onClick={() => navigate(`/documents/${doc.id}`)}
            >
              <h5 className="fw-semibold">{doc.title || 'Untitled Document'}</h5>
              <hr />
              <div
                className="text-muted"
                style={{ maxHeight: '120px', overflow: 'hidden', fontSize: '0.9rem' }}
                dangerouslySetInnerHTML={{ __html: doc.content || '<em>No content</em>' }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
