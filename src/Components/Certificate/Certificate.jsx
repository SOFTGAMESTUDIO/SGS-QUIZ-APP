import React, { useRef, useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import JD from "../../assets/JD.png";
import LG from "../../assets/LG.png";
import SK from "../../assets/SK.png";
import Cer from "../../assets/Certificate.png";
import company from "../../assets/23.png";
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Dialog } from '@capacitor/dialog';
import { Capacitor } from '@capacitor/core';
import { FileOpener } from '@capacitor-community/file-opener';

const Certificate = ({
  name = "Livesh Garg",
  rollNumber = "250001",
  examName = "JavaScript Basics",
  date = "01-01-2025",
  language = "English",
  score = "80",
  Que = "100",
}) => {
  const printRef = useRef();
  const [storagePermission, setStoragePermission] = useState(false);
  const [isNativePlatform, setIsNativePlatform] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [filePath, setFilePath] = useState('');
  const isDownloadingRef = useRef(false);

  useEffect(() => {
    const platform = Capacitor.getPlatform();
    setIsNativePlatform(platform !== 'web');
    
    if (platform !== 'web') {
      checkStoragePermission();
    }
  }, []);

  const checkStoragePermission = async () => {
    try {
      const { value } = await Preferences.get({ key: 'storagePermission' });
      if (value === 'granted') {
        setStoragePermission(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking storage permission:', error);
      return false;
    }
  };

  const requestStoragePermission = async () => {
    const { value } = await Dialog.confirm({
      title: 'Storage Permission Required',
      message: 'To save certificates, this app needs access to your device storage.',
      okButtonTitle: 'Allow',
      cancelButtonTitle: 'Deny',
    });

    if (value) {
      await Preferences.set({ key: 'storagePermission', value: 'granted' });
      setStoragePermission(true);
      return true;
    }
    return false;
  };

  const percentage = ((score / Que) * 100).toFixed(2);

  const generateCertificatePDF = async () => {
    const element = printRef.current;
    if (!element) throw new Error("Certificate element not found");

    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.style.width = "1123px";
    container.style.height = "794px";
    container.style.backgroundColor = "#0f172a";
    container.style.overflow = "hidden";

    const clone = element.cloneNode(true);
    clone.style.width = "1123px";
    clone.style.height = "794px";
    container.appendChild(clone);
    document.body.appendChild(container);

    try {
      const images = clone.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0f172a",
        width: 1123,
        height: 794,
      });

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1123, 794],
      });

      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 1123, 794);
      return pdf;
    } finally {
      document.body.removeChild(container);
    }
  };

  const saveToDevice = async (pdf) => {
    try {
      const fileName = `SGS_Certificate_${name.replace(/\s+/g, '_')}_${date}.pdf`;
      const pdfData = pdf.output('datauristring').split(',')[1];
      
      const result = await Filesystem.writeFile({
        path: `Download/SGS_Certificates/${fileName}`,
        data: pdfData,
        directory: Directory.ExternalStorage,
        recursive: true
      });

      setFilePath(result.uri);
      return result;
    } catch (error) {
      console.error('Save failed:', error);
      throw error;
    }
  };

  const openCertificateLocation = async () => {
    try {
      if (isNativePlatform && filePath) {
        await FileOpener.open({ 
          filePath: filePath,
          contentType: 'application/pdf'
        });
      } else {
        const downloadPath = navigator.userAgent.includes('Windows') ? 
          'C:\\Users\\[Username]\\Downloads' : 
          '/Users/[Username]/Downloads';
        
        await Dialog.alert({
          title: 'Certificate Location',
          message: `Your certificate has been saved to: ${downloadPath}/SGS_Certificates`,
          buttonTitle: 'OK',
        });
      }
    } catch (error) {
      console.error('Error opening file location:', error);
      Dialog.alert({
        title: 'Error',
        message: 'Could not open certificate location',
        buttonTitle: 'OK',
      });
    }
  };

  const handleDownload = async () => {
    if (isDownloadingRef.current) return;
    isDownloadingRef.current = true;
    
    try {
      setIsDownloading(true);
      setDownloadSuccess(false);
      
      if (isNativePlatform && !storagePermission) {
        const granted = await requestStoragePermission();
        if (!granted) {
          setIsDownloading(false);
          isDownloadingRef.current = false;
          return;
        }
      }

      const pdf = await generateCertificatePDF();
      
      if (isNativePlatform) {
        await saveToDevice(pdf);
      } else {
        pdf.save(`SGS_Certificate_${name.replace(/\s+/g, '_')}.pdf`);
      }
      
      setDownloadSuccess(true);
      
    } catch (error) {
      console.error("Download failed:", error);
      await Dialog.alert({
        title: 'Error',
        message: `Download failed: ${error.message || 'Please try again'}`,
        buttonTitle: 'OK',
      });
    } finally {
      setIsDownloading(false);
      isDownloadingRef.current = false;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4 sm:p-10">
      {isDownloading && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-xs sm:max-w-md">
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              Generating Certificate
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Please wait while we prepare and save your certificate...
            </p>
            <p className="text-gray-500 text-xs mt-2">
              This may take 5-10 seconds
            </p>
          </div>
        </div>
      )}

      {downloadSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-xs sm:max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              Download Complete!
            </h3>
            <p className="text-gray-600 mb-4">
              Certificate saved successfully
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={openCertificateLocation}
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-4 py-2 rounded transition"
              >
                {isNativePlatform ? 'Open Certificate' : 'Show Location'}
              </button>
              <button
                onClick={() => setDownloadSuccess(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={handleDownload}
          className={`text-white font-semibold px-8 py-3 rounded-lg transition ${
            isDownloading ? 'bg-purple-300 cursor-not-allowed' : 'bg-purple-500 hover:bg-purple-600'
          }`}
          disabled={isDownloading || (isNativePlatform && !storagePermission)}
        >
          {isDownloading ? (
            <div className="flex items-center justify-center">
              <span>Downloading...</span>
            </div>
          ) : (
            'Download Certificate'
          )}
        </button>
      </div>

      <div className="overflow-scroll w-screen md:w-full">
        <div
          ref={printRef}
          className="relative w-[1123px] h-[794px] bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${Cer})` }}
        >
          <div className="certificate relative w-full h-full text-black p-12 sm:p-16 rounded-lg">
            <div className="absolute bottom-8 right-12 text-center mb-4 mt-4">
              <div className="flex flex-row items-center justify-center">
                <img
                  src={company}
                  alt="Soft Game Studio"
                  className="h-10 rounded-full mr-3"
                />
                <strong className="font-bold font-serif">SOFT GAME STUDIO</strong>
              </div>
            </div>

            <div className="text-center px-4 sm:px-20">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-black mb-2">
                CERTIFICATE
              </h1>
              <h2 className="text-xl sm:text-2xl text-black tracking-widest mb-4">
                OF APPRECIATION
              </h2>
              
              <p className="uppercase tracking-wider text-sm text-black mt-4">
                Presented To
              </p>
              <h3 className="text-3xl sm:text-4xl font-bold border-b-2 border-yellow-500 inline-block px-6 py-4 mt-2 font-serif italic">
                {name}
              </h3>
              
              <div className="mt-2 space-y-2">
                <p><strong>Roll No.:</strong> {rollNumber}</p>
                <p><strong>Grade:</strong> {score}/{Que} ({percentage}%)</p>
              </div>

              <p className="mt-2 ml-32 mr-32">
                This certificate is proudly awarded for successfully completing the&nbsp;
                <strong className="text-black">{examName}</strong> in&nbsp;
                <strong className="text-black">{language}</strong> Quiz Competition, conducted by&nbsp;
                <strong className="text-black">Soft Game Studio</strong>.
              </p>

              <p className="mt-2 ml-32 mr-32">
                Your achievement highlights not only your strong grasp of the subject matter but also your outstanding dedication, focus, and perseverance.
                We commend your hard work, resilience, and passion for continuous learning. This accomplishment stands as a testament to your commitment
                to excellence and your determination to succeed.
              </p>
            </div>

            <div className="flex justify-evenly mt-8 text-center items-end flex-wrap mb-8">
              <div>
                <img src={LG} alt="Director" className="h-12 mx-auto m-2" />
                <p className="font-medium">Livesh Garg</p>
                <p className="text-sm text-gray-900">Director of Education</p>
              </div>
              <div>
                <img src={JD} alt="Conductor" className="h-12 mx-auto m-2" />
                <p className="font-medium">Jatin Dua</p>
                <p className="text-sm text-gray-900">Exam Conductor</p>
              </div>
              <div>
                <img src={SK} alt="Exam Head" className="h-12 mx-auto m-2" />
                <p className="font-medium">Sharik Hasan</p>
                <p className="text-sm text-gray-900">Exam Head</p>
              </div>
            </div>

            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-sm text-black">
              Date of Completion: {date}
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-500">
              <strong className="text-xs text-black">License No.: UDYAM-PB-06-0032977/85499</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;