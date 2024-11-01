// // src/api/boardApi.ts
// import apiClient from './apiClient';

// interface BoardInfo {
//   type: string;
//   title: string;
//   content: string;
//   thumbnail: string;
// }

// export const boardApi = {
//   // 게시글 생성 (CreateBoardRequest)
//   createPost: async (info: BoardInfo) => {
//     try {
//       const response = await apiClient.post(
//         `/board/${info.type}`,
//         {
//           title: info.title,
//           content: info.content,
//           thumbnail: info.thumbnail,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       return response;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   },

//   // 게시글 삭제 (RemoveBoardRequest)
//   deletePost: async (type: string, id: number) => {
//     try {
//       const response = await apiClient.delete(
//         `/board/${type}/${id}`,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       return response;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   },

//   // 게시글 수정 (UpdateBoardRequest)
//   updatePost: async (title: string, content: string, type: string, id: number) => {
//     try {
//       const response = await apiClient.put(
//         `/board/${type}/${id}`,
//         {
//           title: title,
//           content: content,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       return response;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   },

//   // 게시글 목록 조회
//   getPosts: (type: string) => 
//     apiClient.get(`/board/${type}`),

//   // 게시글 상세 조회
//   getPost: (type: string, postId: number) => 
//     apiClient.get(`/board/${type}/${postId}`),

//   // 게시글 좋아요 토글
//   toggleLike: (postId: number) => 
//     apiClient.put(`/postId/${postId}/like`),

//   // 게시글 검색
//   searchPosts: (keyword: string) => 
//     apiClient.get(`/board/${keyword}`),
// };