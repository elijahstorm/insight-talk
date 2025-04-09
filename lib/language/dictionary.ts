export const languages = [
	{
		name: 'English',
		code: 'en',
	},
	{
		name: '한국어',
		code: 'kor',
	},
	{
		name: '中文 (简体)',
		code: 'ch0',
	},
	{
		name: '中文 (簡體)',
		code: 'ch1',
	},
	{
		name: 'Français',
		code: 'fr',
	},
] as const

export const dictionary = {
	messages: {
		analysis: {
			comPattern: {
				en: 'Communication Pattern',
				kor: '의사소통 패턴',
				ch0: '沟通模式',
				ch1: '溝通模式',
				fr: 'Modèle de communication',
			},
			insightAndRec: {
				en: 'Insight & Recommendation',
				kor: '통찰 및 추천',
				ch0: '洞察与建议',
				ch1: '洞察與建議',
				fr: 'Aperçu et recommandation',
			},
			potentialTriggers: {
				en: 'Potential Conflict Triggers',
				kor: '잠재적 갈등 요인',
				ch0: '潜在冲突触发因素',
				ch1: '潛在衝突觸發因素',
				fr: 'Déclencheurs de conflits potentiels',
			},
			replyIdeas: {
				en: 'Reply Ideas',
				kor: '답변 아이디어',
				ch0: '回复建议',
				ch1: '回覆建議',
				fr: 'Idées de réponse',
			},
			newChat: {
				uploadedFileHeader: {
					en: 'Upload Your Converstation',
					kor: '대화를 업로드하세요',
					ch0: '上传您的对话',
					ch1: '上傳您的對話',
					fr: 'Téléchargez votre conversation',
				},
				uploading: {
					en: 'Uploading...',
					kor: '上传中...',
					ch0: '上传中...',
					ch1: '上傳中...',
					fr: 'Téléchargement...',
				},
				uploadingFiles: {
					en: 'Uploading your files...',
					kor: '파일을 업로드 중...',
					ch0: '正在上传您的文件...',
					ch1: '正在上傳您的文件...',
					fr: 'Téléchargement de vos fichiers...',
				},
				makingSenseOfChats: {
					en: 'We’re making sense of your chats...',
					kor: '대화를 분석 중입니다...',
					ch0: '我们正在分析您的对话...',
					ch1: '我們正在分析您的對話...',
					fr: 'Nous analysons vos conversations...',
				},
				holdOn: {
					en: 'Hold on!',
					kor: '잠시만 기다려주세요!',
					ch0: '请稍等！',
					ch1: '請稍等！',
					fr: 'Patientez un instant !',
				},
				uploadFailed: {
					en: 'Failed to get files',
					kor: '파일을 가져오지 못했습니다',
					ch0: '无法获取文件',
					ch1: '無法獲取文件',
					fr: "Échec de l'obtention des fichiers",
				},
				partnerTypeQuestion: {
					en: 'Who was this conversation with?',
					kor: '이 대화는 누구와 나눈 것인가요?',
					ch0: '这次对话是和谁进行的？',
					ch1: '這次對話是和誰進行的？',
					fr: 'Avec qui était cette conversation ?',
				},
				start: {
					en: 'Check Talk Insight',
					kor: '대화 통찰 확인',
					ch0: '查看对话洞察',
					ch1: '查看對話洞察',
					fr: 'Vérifier les aperçus de conversation',
				},
				toasts: {
					error: {
						en: 'Failed to create your chat. Try again later',
						kor: '채팅을 생성하지 못했습니다. 나중에 다시 시도하세요.',
						ch0: '创建聊天失败，请稍后再试。',
						ch1: '創建聊天失敗，請稍後再試。',
						fr: 'Échec de la création de votre chat. Réessayez plus tard.',
					},
				},
				buttons: {
					newConversation: {
						en: 'New Converstation',
						kor: '새로운 대화',
						ch0: '新对话',
						ch1: '新對話',
						fr: 'Nouvelle conversation',
					},
					attachAFile: {
						en: 'Attach a File',
						kor: '파일 첨부',
						ch0: '附加文件',
						ch1: '附加文件',
						fr: 'Joindre un Dossier',
					},
					attachAnImage: {
						en: 'Attach an Image',
						kor: '이미지 첨부',
						ch0: '附加图像',
						ch1: '附加圖像',
						fr: 'Joindre une Image',
					},
				},
			},
			followUp: {
				en: 'Ask about your communication style, their emotions, or even your next message. Let’s explore together.',
				kor: '당신의 의사소통 스타일, 상대방의 감정, 또는 다음 메시지에 대해 물어보세요. 함께 탐구해 봅시다.',
				ch0: '询问您的沟通风格、对方的情绪，甚至是您的下一条消息。让我们一起探索。',
				ch1: '詢問您的溝通風格、對方的情緒，甚至是您的下一條消息。讓我們一起探索。',
				fr: 'Posez des questions sur votre style de communication, leurs émotions ou même votre prochain message. Explorons ensemble.',
			},
			defaultSuggestedActions: {
				en: [
					{
						title: 'Analyze my tone',
						label: 'in a recent conversation',
						action: 'Can you analyze the tone of this conversation?',
					},
					{
						title: 'Detect toxic language',
						label: 'in a workplace message',
						action: 'Can you detect toxic language in this workplace message?',
					},
					{
						title: 'Identify conflict triggers',
						label: 'in my communication',
						action: 'What are the conflict triggers in this conversation?',
					},
					{
						title: 'Suggest empathetic responses',
						label: 'to improve my communication',
						action: 'Can you suggest empathetic responses for this situation?',
					},
				],
				kor: [
					{
						title: '내 톤 분석하기',
						label: '최근 대화에서',
						action: '이 대화의 톤을 분석해 줄 수 있나요?',
					},
					{
						title: '유해한 언어 감지하기',
						label: '직장 메시지에서',
						action: '이 직장 메시지에서 유해한 언어를 감지할 수 있나요?',
					},
					{
						title: '갈등 요인 식별하기',
						label: '내 의사소통에서',
						action: '이 대화에서 갈등 요인은 무엇인가요?',
					},
					{
						title: '공감적인 답변 제안하기',
						label: '내 의사소통을 개선하기 위해',
						action: '이 상황에 대해 공감적인 답변을 제안해 줄 수 있나요?',
					},
				],
				ch0: [
					{
						title: '分析我的语气',
						label: '在最近的对话中',
						action: '你能分析这次对话的语气吗？',
					},
					{
						title: '检测有害语言',
						label: '在工作场所的消息中',
						action: '你能检测这条工作场所消息中的有害语言吗？',
					},
					{
						title: '识别冲突触发因素',
						label: '在我的沟通中',
						action: '这次对话中的冲突触发因素是什么？',
					},
					{
						title: '建议富有同理心的回应',
						label: '以改善我的沟通',
						action: '你能为这种情况建议富有同理心的回应吗？',
					},
				],
				ch1: [
					{
						title: '分析我的語氣',
						label: '在最近的對話中',
						action: '你能分析這次對話的語氣嗎？',
					},
					{
						title: '檢測有害語言',
						label: '在工作場所的消息中',
						action: '你能檢測這條工作場所消息中的有害語言嗎？',
					},
					{
						title: '識別衝突觸發因素',
						label: '在我的溝通中',
						action: '這次對話中的衝突觸發因素是什麼？',
					},
					{
						title: '建議富有同理心的回應',
						label: '以改善我的溝通',
						action: '你能為這種情況建議富有同理心的回應嗎？',
					},
				],
				fr: [
					{
						title: 'Analyser mon ton',
						label: 'dans une conversation récente',
						action: 'Pouvez-vous analyser le ton de cette conversation ?',
					},
					{
						title: 'Détecter un langage toxique',
						label: 'dans un message professionnel',
						action: 'Pouvez-vous détecter un langage toxique dans ce message professionnel ?',
					},
					{
						title: 'Identifier les déclencheurs de conflit',
						label: 'dans ma communication',
						action: 'Quels sont les déclencheurs de conflit dans cette conversation ?',
					},
					{
						title: 'Suggérer des réponses empathiques',
						label: 'pour améliorer ma communication',
						action: 'Pouvez-vous suggérer des réponses empathiques pour cette situation ?',
					},
				],
			},
			upsale: {
				lookingForClarity: {
					en: 'Looking for clarity?',
					kor: '명확성을 찾고 계신가요?',
					ch0: '在寻找清晰的答案吗？',
					ch1: '在尋找清晰的答案嗎？',
					fr: 'Vous cherchez de la clarté ?',
				},
				wonderedWhy: {
					en: 'Ever wondered why they said that?',
					kor: '그들이 왜 그렇게 말했는지 궁금하셨나요?',
					ch0: '有没有想过他们为什么这么说？',
					ch1: '有沒有想過他們為什麼這麼說？',
					fr: 'Vous êtes-vous déjà demandé pourquoi ils ont dit cela ?',
				},
				wantToGoDeeper: {
					en: 'Want to go deeper?',
					kor: '더 깊이 들어가고 싶으신가요?',
					ch0: '想更深入了解吗？',
					ch1: '想更深入了解嗎？',
					fr: 'Envie d’aller plus loin ?',
				},
				letMeHelp: {
					en: 'Let me help you understand what’s really going on',
					kor: '무슨 일이 일어나고 있는지 이해할 수 있도록 도와드릴게요',
					ch0: '让我帮您了解真正发生了什么',
					ch1: '讓我幫您了解真正發生了什麼',
					fr: 'Laissez-moi vous aider à comprendre ce qui se passe vraiment',
				},
			},
		},
		actions: {
			question: {
				en: 'Was this analysis helpful?',
				kor: '이 분석이 도움이 되었나요?',
				ch0: '这个分析有帮助吗？',
				ch1: '這個分析有幫助嗎？',
				fr: 'Cette analyse a-t-elle été utile ?',
			},
			yes: {
				en: 'It was accurate and useful!',
				kor: '정확하고 유용했어요!',
				ch0: '准确且有用！',
				ch1: '準確且有用！',
				fr: "C'était précis et utile !",
			},
			toolTipYes: {
				en: 'Upvote Response',
				kor: '응답 추천',
				ch0: '点赞回复',
				ch1: '點贊回覆',
				fr: 'Réponse positive',
			},
			no: {
				en: "It wasn't helpful or didn't make sense.",
				kor: '도움이 되지 않거나 이해되지 않았어요.',
				ch0: '没有帮助或不明白。',
				ch1: '沒有幫助或不明白。',
				fr: "Cela n'a pas été utile ou n'avait pas de sens.",
			},
			toolTipNo: {
				en: 'Downvote Response',
				kor: '응답 비추천',
				ch0: '点踩回复',
				ch1: '點踩回覆',
				fr: 'Réponse négative',
			},
			copy: {
				en: 'Copy',
				kor: '복사',
				ch0: '复制',
				ch1: '複製',
				fr: 'Copier',
			},
			toasts: {
				copy: {
					error: {
						en: "There's no text to copy!",
						kor: '복사할 텍스트가 없습니다!',
						ch0: '没有可复制的文本！',
						ch1: '沒有可複製的文本！',
						fr: 'Aucun texte à copier !',
					},
					success: {
						en: 'Copied to clipboard!',
						kor: '클립보드에 복사되었습니다!',
						ch0: '已复制到剪贴板！',
						ch1: '已複製到剪貼板！',
						fr: 'Copié dans le presse-papiers !',
					},
				},
				upvote: {
					error: {
						en: 'Failed to upvote response.',
						kor: '응답 추천에 실패했습니다.',
						ch0: '点赞失败。',
						ch1: '點贊失敗。',
						fr: "Échec de l'approbation de la réponse.",
					},
					success: {
						en: 'Upvoted Response!',
						kor: '응답을 추천했습니다!',
						ch0: '已点赞回复！',
						ch1: '已點贊回覆！',
						fr: 'Réponse approuvée !',
					},
					loading: {
						en: 'Upvoting Response...',
						kor: '응답을 추천 중...',
						ch0: '正在点赞回复...',
						ch1: '正在點贊回覆...',
						fr: 'Approbation de la réponse en cours...',
					},
				},
				downvote: {
					error: {
						en: 'Failed to downvote response.',
						kor: '응답 비추천에 실패했습니다.',
						ch0: '点踩失败。',
						ch1: '點踩失敗。',
						fr: 'Échec du rejet de la réponse.',
					},
					success: {
						en: 'Downvoted Response!',
						kor: '응답을 비추천했습니다!',
						ch0: '已点踩回复！',
						ch1: '已點踩回覆！',
						fr: 'Réponse rejetée !',
					},
					loading: {
						en: 'Downvoting Response...',
						kor: '응답을 비추천 중...',
						ch0: '正在点踩回复...',
						ch1: '正在點踩回覆...',
						fr: 'Rejet de la réponse en cours...',
					},
				},
			},
		},
		navigation: {
			toasts: {
				share: {
					error: {
						en: 'Error trying to share',
						kor: '공유 시도 중 오류 발생',
						ch0: '尝试分享时出错',
						ch1: '嘗試分享時出錯',
						fr: 'Erreur lors de la tentative de partage',
					},
					success: {
						en: 'Copied link to clipboard!',
						kor: '링크가 클립보드에 복사되었습니다!',
						ch0: '链接已复制到剪贴板！',
						ch1: '鏈接已複製到剪貼板！',
						fr: 'Lien copié dans le presse-papiers !',
					},
				},
				reply: {
					copied: {
						en: 'Reply copied to clipboard',
						kor: '답변이 클립보드에 복사되었습니다.',
						ch0: '回复已复制到剪贴板。',
						ch1: '回覆已複製到剪貼板。',
						fr: 'Réponse copiée dans le presse-papiers.',
					},
				},
			},
			share: {
				en: 'Share',
				kor: '공유',
				ch0: '分享',
				ch1: '分享',
				fr: 'Partager',
			},
			getDeeperInsight: {
				en: 'Get a Deeper Insight',
				kor: '더 깊은 통찰 얻기',
				ch0: '获取更深入的洞察',
				ch1: '獲取更深入的洞察',
				fr: 'Obtenez une analyse plus approfondie',
			},
			backToHistory: {
				en: 'Back to History',
				kor: '기록으로 돌아가기',
				ch0: '返回历史记录',
				ch1: '返回歷史記錄',
				fr: 'Retour à l’historique',
			},
			readMore: {
				en: 'Read more',
				kor: '더 읽기',
				ch0: '阅读更多',
				ch1: '閱讀更多',
				fr: 'Lire la suite',
			},
			showNextButton: {
				'chat-logs': {
					en: 'View your Chat Logs',
					kor: '채팅 기록 보기',
					ch0: '查看聊天记录',
					ch1: '查看聊天記錄',
					fr: 'Voir les journaux de chat',
				},
				'com-pattern': {
					en: 'See Your Communication Pattern',
					kor: '의사소통 패턴 보기',
					ch0: '查看沟通模式',
					ch1: '查看溝通模式',
					fr: 'Voir le modèle de communication',
				},
				replies: {
					en: 'See the Reply Ideas',
					kor: '답변 아이디어 보기',
					ch0: '查看回复建议',
					ch1: '查看回覆建議',
					fr: 'Voir les idées de réponse',
				},
				triggers: {
					en: 'Potential Triggers',
					kor: '잠재적 갈등 요인',
					ch0: '潜在触发因素',
					ch1: '潛在觸發因素',
					fr: 'Déclencheurs potentiels',
				},
				insight: {
					en: 'See Chat Insights',
					kor: '대화 통찰 보기',
					ch0: '查看聊天洞察',
					ch1: '查看聊天洞察',
					fr: 'Voir les aperçus de chat',
				},
				text: {
					en: 'See Chats',
					kor: '채팅 보기',
					ch0: '查看聊天',
					ch1: '查看聊天',
					fr: 'Voir les chats',
				},
				reasoning: {
					en: 'See Chats',
					kor: '채팅 보기',
					ch0: '查看聊天',
					ch1: '查看聊天',
					fr: 'Voir les chats',
				},
				'tool-invocation': {
					en: 'See Chats',
					kor: '채팅 보기',
					ch0: '查看聊天',
					ch1: '查看聊天',
					fr: 'Voir les chats',
				},
				source: {
					en: 'See Chats',
					kor: '채팅 보기',
					ch0: '查看聊天',
					ch1: '查看聊天',
					fr: 'Voir les chats',
				},
			},
		},
		chat: {
			errorOccured: {
				en: 'An error occured, please try again!',
				kor: '오류가 발생했습니다. 다시 시도해주세요!',
				ch0: '出现错误，请重试！',
				ch1: '出現錯誤，請重試！',
				fr: "Une erreur s'est produite, veuillez réessayer !",
			},
			uploadFailed: {
				en: 'Failed to upload file, please try again!',
				kor: '파일 업로드에 실패했습니다. 다시 시도해주세요!',
				ch0: '文件上传失败，请重试！',
				ch1: '文件上傳失敗，請重試！',
				fr: 'Échec du téléchargement du fichier, veuillez réessayer !',
			},
			pleaseWait: {
				en: 'Please wait for the model to finish its response!',
				kor: '모델이 응답을 완료할 때까지 기다려주세요!',
				ch0: '请等待模型完成响应！',
				ch1: '請等待模型完成回應！',
				fr: 'Veuillez attendre que le modèle termine sa réponse !',
			},
			deletingChat: {
				loading: {
					en: 'Deleting chat...',
					kor: '채팅 삭제 중...',
					ch0: '正在删除聊天...',
					ch1: '正在刪除聊天...',
					fr: 'Suppression du chat...',
				},
				success: {
					en: 'Chat deleted successfully',
					kor: '채팅이 성공적으로 삭제되었습니다',
					ch0: '聊天已成功删除',
					ch1: '聊天已成功刪除',
					fr: 'Chat supprimé avec succès',
				},
				failed: {
					en: 'Failed to delete chat',
					kor: '채팅 삭제에 실패했습니다',
					ch0: '删除聊天失败',
					ch1: '刪除聊天失敗',
					fr: 'Échec de la suppression du chat',
				},
			},
			sendAMessage: {
				en: 'Ask Talk Insight...',
				kor: 'Talk Insight에게 물어보세요...',
				ch0: '向 Talk Insight 提问...',
				ch1: '向 Talk Insight 提問...',
				fr: 'Demandez à Talk Insight...',
			},
		},
	},
	sidebar: {
		language: {
			names: {
				en: 'Language',
				kor: '언어',
				ch0: '语言',
				ch1: '語言',
				fr: 'Langue',
			},
			changed: {
				en: (toLang: string) => `Changed your language to ${toLang}`,
				kor: (toLang: string) => `${toLang} 언어로 변경되었습니다`,
				ch0: (toLang: string) => `已将语言更改为 ${toLang}`,
				ch1: (toLang: string) => `已將語言更改為 ${toLang}`,
				fr: (toLang: string) => `Langue changée en ${toLang}`,
			},
			failedChange: {
				en: (toLang: string) => `Failed to update your language to ${toLang}`,
				kor: (toLang: string) => `${toLang} 언어로 업데이트하지 못했습니다`,
				ch0: (toLang: string) => `无法将语言更新为 ${toLang}`,
				ch1: (toLang: string) => `無法將語言更新為 ${toLang}`,
				fr: (toLang: string) => `Échec de la mise à jour de la langue en ${toLang}`,
			},
		},
		liked: {
			en: 'Liked',
			kor: '좋아요',
			ch0: '喜欢',
			ch1: '喜歡',
			fr: 'Aimé',
		},
		history: {
			en: 'History',
			kor: '기록',
			ch0: '历史',
			ch1: '歷史',
			fr: 'Historique',
		},
		actions: {
			delete: {
				delete: {
					en: 'Delete',
					kor: '삭제',
					ch0: '删除',
					ch1: '刪除',
					fr: 'Supprimer',
				},
				confirmation: {
					en: 'Are you absolutely sure?',
					kor: '정말 확실합니까?',
					ch0: '您确定吗？',
					ch1: '您確定嗎？',
					fr: 'Êtes-vous absolument sûr ?',
				},
				details: {
					en: 'This action cannot be undone. This will permanently delete your chat and remove it from our servers.',
					kor: '이 작업은 되돌릴 수 없습니다. 이 작업은 채팅을 영구적으로 삭제하고 서버에서 제거합니다.',
					ch0: '此操作无法撤销。这将永久删除您的聊天并将其从我们的服务器中移除。',
					ch1: '此操作無法撤銷。這將永久刪除您的聊天並將其從我們的伺服器中移除。',
					fr: 'Cette action est irréversible. Cela supprimera définitivement votre chat et le retirera de nos serveurs.',
				},
				cancel: {
					en: 'Cancel',
					kor: '취소',
					ch0: '取消',
					ch1: '取消',
					fr: 'Annuler',
				},
				continue: {
					en: 'Continue',
					kor: '계속',
					ch0: '继续',
					ch1: '繼續',
					fr: 'Continuer',
				},
			},
			private: {
				en: 'Private',
				kor: '비공개',
				ch0: '私密',
				ch1: '私密',
				fr: 'Privé',
			},
			public: {
				en: 'Public',
				kor: '공개',
				ch0: '公开',
				ch1: '公開',
				fr: 'Public',
			},
			more: {
				en: 'More',
				kor: '더 보기',
				ch0: '更多',
				ch1: '更多',
				fr: 'Plus',
			},
			addChats: {
				likeLimited: {
					en: 'Like any message to have them appear here!',
					kor: '메시지를 좋아요하면 여기에 표시됩니다!',
					ch0: '点赞任何消息即可在此显示！',
					ch1: '點讚任何消息即可在此顯示！',
					fr: "Aimez un message pour qu'il apparaisse ici !",
				},
				all: {
					en: 'Your conversations will appear here once you start chatting!',
					kor: '채팅을 시작하면 대화가 여기에 표시됩니다!',
					ch0: '开始聊天后，您的对话将显示在此处！',
					ch1: '開始聊天後，您的對話將顯示在此處！',
					fr: 'Vos conversations apparaîtront ici une fois que vous commencerez à discuter !',
				},
			},
			login: {
				en: 'Login to save and revisit previous chats!',
				kor: '이전 채팅을 저장하고 다시 방문하려면 로그인하세요!',
				ch0: '登录以保存并重新访问以前的聊天！',
				ch1: '登錄以保存並重新訪問以前的聊天！',
				fr: 'Connectez-vous pour enregistrer et revisiter vos conversations précédentes !',
			},
			signOut: {
				en: 'Sign out',
				kor: '로그아웃',
				ch0: '登出',
				ch1: '登出',
				fr: 'Déconnexion',
			},
		},
	},
	history: {
		title: {
			en: 'History',
			kor: '기록',
			ch0: '历史',
			ch1: '歷史',
			fr: 'Historique',
		},
		search: {
			en: 'Search Conversations',
			kor: '대화 검색',
			ch0: '搜索对话',
			ch1: '搜索對話',
			fr: 'Rechercher des conversations',
		},
		today: {
			en: 'Today',
			kor: '오늘',
			ch0: '今天',
			ch1: '今天',
			fr: "Aujourd'hui",
		},
		yesterday: {
			en: 'Yesterday',
			kor: '어제',
			ch0: '昨天',
			ch1: '昨天',
			fr: 'Hier',
		},
		lastWeek: {
			en: 'Last Week',
			kor: '지난 주',
			ch0: '上周',
			ch1: '上週',
			fr: 'La semaine dernière',
		},
		lastMonth: {
			en: 'Last Month',
			kor: '지난 달',
			ch0: '上个月',
			ch1: '上個月',
			fr: 'Le mois dernier',
		},
		older: {
			en: 'Older',
			kor: '이전',
			ch0: '更早',
			ch1: '更早',
			fr: 'Plus ancien',
		},
	},
	tooltips: {
		newChat: {
			en: 'New Chat',
			kor: '새 채팅',
			ch0: '新聊天',
			ch1: '新聊天',
			fr: 'Nouveau chat',
		},
		toggleSidebar: {
			en: 'Toggle Sidebar',
			kor: '사이드바 전환',
			ch0: '切换侧边栏',
			ch1: '切換側邊欄',
			fr: 'Basculer la barre latérale',
		},
		toggleLightMode: {
			en: 'Toggle light mode',
			kor: '라이트 모드 전환',
			ch0: '切换到浅色模式',
			ch1: '切換到淺色模式',
			fr: 'Basculer en mode clair',
		},
		signOut: {
			en: 'Sign Out',
			kor: '로그아웃',
			ch0: '登出',
			ch1: '登出',
			fr: 'Déconnexion',
		},
	},
	relationshipTypes: {
		en: [
			{
				title: 'Romantic & Dating',
				types: [
					{
						icon: '💕',
						type: 'Romantic Partner',
					},
					{
						icon: '💞',
						type: 'Potential Partner',
					},
					{
						icon: '💔',
						type: 'Ex-Partner',
					},
				],
			},
			{
				title: 'Friendship & Social',
				types: [
					{
						icon: '👫',
						type: 'Close Friend',
					},
					{
						icon: '🎉',
						type: 'Acquaintance',
					},
				],
			},
			{
				title: 'Family',
				types: [
					{
						icon: '👪',
						type: 'Immediate Family',
					},
					{
						icon: '🏡',
						type: 'Distant Relative',
					},
				],
			},
			{
				title: 'Work & Professional',
				types: [
					{
						icon: '🏡',
						type: 'Coworker',
					},
					{
						icon: '👩‍💼',
						type: 'Manager',
					},
					{
						icon: '🤝',
						type: 'Business Contact',
					},
				],
			},
			{
				title: 'Other',
				types: [
					{
						icon: '❓',
						type: 'Not Listed / Prefer Not to Say',
					},
				],
			},
		],
		kor: [
			{
				title: '연애 및 데이트',
				types: [
					{
						icon: '💕',
						type: '연인',
					},
					{
						icon: '💞',
						type: '잠재적 연인',
					},
					{
						icon: '💔',
						type: '전 연인',
					},
				],
			},
			{
				title: '우정 및 사회적 관계',
				types: [
					{
						icon: '👫',
						type: '친한 친구',
					},
					{
						icon: '🎉',
						type: '지인',
					},
				],
			},
			{
				title: '가족',
				types: [
					{
						icon: '👪',
						type: '직계 가족',
					},
					{
						icon: '🏡',
						type: '먼 친척',
					},
				],
			},
			{
				title: '직장 및 전문 관계',
				types: [
					{
						icon: '🏡',
						type: '동료',
					},
					{
						icon: '👩‍💼',
						type: '관리자',
					},
					{
						icon: '🤝',
						type: '비즈니스 연락처',
					},
				],
			},
			{
				title: '기타',
				types: [
					{
						icon: '❓',
						type: '나열되지 않음 / 말하지 않음',
					},
				],
			},
		],
		ch0: [
			{
				title: '恋爱与约会',
				types: [
					{
						icon: '💕',
						type: '恋人',
					},
					{
						icon: '💞',
						type: '潜在恋人',
					},
					{
						icon: '💔',
						type: '前任',
					},
				],
			},
			{
				title: '友谊与社交',
				types: [
					{
						icon: '👫',
						type: '密友',
					},
					{
						icon: '🎉',
						type: '熟人',
					},
				],
			},
			{
				title: '家庭',
				types: [
					{
						icon: '👪',
						type: '直系亲属',
					},
					{
						icon: '🏡',
						type: '远亲',
					},
				],
			},
			{
				title: '工作与专业关系',
				types: [
					{
						icon: '🏡',
						type: '同事',
					},
					{
						icon: '👩‍💼',
						type: '经理',
					},
					{
						icon: '🤝',
						type: '商务联系人',
					},
				],
			},
			{
				title: '其他',
				types: [
					{
						icon: '❓',
						type: '未列出 / 不愿透露',
					},
				],
			},
		],
		ch1: [
			{
				title: '戀愛與約會',
				types: [
					{
						icon: '💕',
						type: '戀人',
					},
					{
						icon: '💞',
						type: '潛在戀人',
					},
					{
						icon: '💔',
						type: '前任',
					},
				],
			},
			{
				title: '友誼與社交',
				types: [
					{
						icon: '👫',
						type: '密友',
					},
					{
						icon: '🎉',
						type: '熟人',
					},
				],
			},
			{
				title: '家庭',
				types: [
					{
						icon: '👪',
						type: '直系親屬',
					},
					{
						icon: '🏡',
						type: '遠親',
					},
				],
			},
			{
				title: '工作與專業關係',
				types: [
					{
						icon: '🏡',
						type: '同事',
					},
					{
						icon: '👩‍💼',
						type: '經理',
					},
					{
						icon: '🤝',
						type: '商務聯絡人',
					},
				],
			},
			{
				title: '其他',
				types: [
					{
						icon: '❓',
						type: '未列出 / 不願透露',
					},
				],
			},
		],
		fr: [
			{
				title: 'Amour et rencontres',
				types: [
					{
						icon: '💕',
						type: 'Partenaire romantique',
					},
					{
						icon: '💞',
						type: 'Partenaire potentiel',
					},
					{
						icon: '💔',
						type: 'Ancien partenaire',
					},
				],
			},
			{
				title: 'Amitié et social',
				types: [
					{
						icon: '👫',
						type: 'Ami proche',
					},
					{
						icon: '🎉',
						type: 'Connaissance',
					},
				],
			},
			{
				title: 'Famille',
				types: [
					{
						icon: '👪',
						type: 'Famille proche',
					},
					{
						icon: '🏡',
						type: 'Parent éloigné',
					},
				],
			},
			{
				title: 'Travail et relations professionnelles',
				types: [
					{
						icon: '🏡',
						type: 'Collègue',
					},
					{
						icon: '👩‍💼',
						type: 'Manager',
					},
					{
						icon: '🤝',
						type: 'Contact professionnel',
					},
				],
			},
			{
				title: 'Autre',
				types: [
					{
						icon: '❓',
						type: 'Non répertorié / Préfère ne pas dire',
					},
				],
			},
		],
	},
} as const
