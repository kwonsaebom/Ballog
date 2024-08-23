export const getPresignedUrl = async (fileName, fileLocation, fileType) => {
  // S3 프리사인드 URL을 요청하는 함수
  try {
    const response = await fetch("https://api.ballog.store/api-utils/s3", {
      method: "POST",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FwaS5iYWxsb2cuc3RvcmUiLCJzdWIiOiJ0ZXN0MSIsImlhdCI6MTcyNDM5NzY1NywiZXhwIjoxNzI0NDA0ODU3fQ.YFJhuPnXrXk-VTMtLeAioJPg-B2e6vtXwLiHd51uWEk `, // 실제 액세스 토큰, 현재는 스웨거에서 발급받은 임시 토큰
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: fileName,
        fileLocation: fileLocation,
        fileType: fileType,
        reqType: "put",
      }),
    });

    const data = await response.json();

    if (data.isSuccess) {
      return data.result.presignedUrl;
    } else {
      throw new Error("프리사인드 URL 생성 실패");
    }
  } catch (error) {
    console.error("프리사인드 URL 요청 중 오류 발생:", error);
    throw error;
  }
};

export const uploadFileToS3 = async (presignedUrl, file) => {
  // S3에 파일을 업로드하는 함수
  try {
    const response = await fetch(presignedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (response.ok) {
      console.log("파일이 성공적으로 업로드되었습니다.");
    } else {
      throw new Error("파일 업로드 중 오류가 발생했습니다.");
    }
  } catch (error) {
    console.error("파일 업로드 중 오류 발생:", error);
    throw error;
  }
};
