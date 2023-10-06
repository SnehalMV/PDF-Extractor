import { useState, useEffect } from "react";
import instance from "../utils/apiInstance"
import { PDFDocument } from "pdf-lib";
import { useNavigate } from "react-router-dom"
import Header from "../components/Header";
import { useSelector } from "react-redux"



function Home() {

  const [pdfFile, setFile] = useState(null)
  const [pdfData, setPdfData] = useState(null)
  const [pageArray, setPageArray] = useState([])
  const [selectedPages, setSelectedPages] = useState([])
  const user = useSelector(state => state.user)
  const isLoggedIn = user.success
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  useEffect(() => {
    handleFileSelect()
  }, [pdfFile])

  const handleFileSelect = async () => {
    try {

      const formData = new FormData();
      formData.append('file', pdfFile);
      const response = await instance.post('/file-select', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'arraybuffer'
      })
      const pdfBuffer = response.data
      const pdfDoc = await PDFDocument.load(pdfBuffer);
      const pdfCount = pdfDoc.getPageCount();
      for (let i = 1; i <= pdfCount; i++) {
        setPageArray((prev) => {
          return [...prev, i]
        })
      }
      const blob = new Blob([pdfBuffer], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(blob);
      setPdfData(pdfUrl)
    } catch (error) {
      console.log(error.message);
    }
  }

  const modifyPdf = async () => {
    try {
      const response = await fetch(pdfData);
      const arrayBuffer = await response.arrayBuffer()
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
      const file = new File([blob], 'file.pdf', { type: 'application/pdf' });
      const formData = new FormData()
      formData.append('file', pdfFile)
      formData.append('selectedPages', JSON.stringify(selectedPages))
      const modifyResponse = await instance.post('/modify-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'arraybuffer',
      });
      const newPdfBuffer = modifyResponse.data
      const newBlob = new Blob([newPdfBuffer], { type: 'application/pdf' });
      const newPdfUrl = URL.createObjectURL(newBlob);
      setPdfData(newPdfUrl)
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePageSelect = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedPages((prev) => [...prev, value]);
    } else {
      setSelectedPages((prev) => prev.filter((item) => item !== value));
    }
  }

  { if (!isLoggedIn) return null }
  return (
    <div>
      <Header />
      <div className="m-2">
        <form method="post" encType="multipart/form-data">
          {!pdfData &&
            <div className="flex justify-center p-2 mt-16">
              <div className="flex w-2/3 h-96 items-center justify-center text-gray-500 bg-red-200 border-2 border-neutral-800 border-dashed rounded-xl p-2">
                <label className="text-sm m-3">Select PDF file: </label>
                <input type="file" name='file' accept=".pdf" className="m-3" onChange={(e) => setFile(e.target.files[0])} />
              </div>
            </div>
          }
          {pdfData && <p>Please choose the pages you wish to extract in your preferred order.</p>}
          <div className="flex m-1">
            {pageArray.map((pageNum) => {
              return (
                <div key={pageNum} className="flex">
                  <label className="p-1">{pageNum}</label>
                  <input type="checkbox" onChange={handlePageSelect} value={pageNum} />
                </div>
              )
            })}
          </div>
          {pdfData &&
            <div className="flex flex-col items-center">
              {selectedPages.length !== 0 &&
                <p className="text-sm font-bold">
                  Current order is:
                  {selectedPages.map((pageNum) => {
                    return (
                      <span key={pageNum} className="p-1">
                        {pageNum}
                      </span>)
                  })}
                </p>
              }
              <button type='button' className="bg-sky-300 hover:bg-sky-400 p-2 m-2 rounded-md text-sm" onClick={modifyPdf}>UPDATE PDF</button>
             
            </div>
          }
        </form>
        <div className="flex justify-center">
          {pdfData && (
            <iframe
              title="PDF Viewer"
              src={pdfData}
              width="80%"
              height="600"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Home