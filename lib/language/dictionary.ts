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
				title: {
					en: 'Potential Conflict Triggers',
					kor: '잠재적 갈등 요인',
					ch0: '潜在冲突触发因素',
					ch1: '潛在衝突觸發因素',
					fr: 'Déclencheurs de conflits potentiels',
				},
				information: {
					en: 'Based on your recent conversation patterns, the following may lead to future miscommunication or emotional tension:',
					kor: '최근 대화 패턴을 기반으로 다음 사항들이 향후 오해나 감정적 긴장을 유발할 수 있습니다:',
					ch0: '根据您最近的对话模式，以下内容可能会导致未来的误解或情绪紧张：',
					ch1: '根據您最近的對話模式，以下內容可能會導致未來的誤解或情緒緊張：',
					fr: 'D’après vos récents échanges, les éléments suivants pourraient entraîner des malentendus ou des tensions émotionnelles :',
				},
			},
			replyIdeas: {
				en: 'Reply Ideas',
				kor: '답변 아이디어',
				ch0: '回复建议',
				ch1: '回覆建議',
				fr: 'Idées de réponse',
			},
			newChat: {
				filesNotStored: {
					en: 'Your files are not stored or shared in any way :)',
					kor: '파일은 저장되거나 공유되지 않아요 :)',
					ch0: '您的文件不会被存储或共享 :)',
					ch1: '您的檔案不會被儲存或分享 :)',
					fr: 'Vos fichiers ne sont ni stockés ni partagés :)',
				},
				pickYourself: {
					en: 'Pick Yourself',
					kor: '본인을 선택하세요',
					ch0: '请选择你自己',
					ch1: '請選擇你自己',
					fr: 'Choisissez-vous',
				},
				pickYourselfInfo: {
					en: 'Help us know which person is you',
					kor: '어떤 사람이 본인인지 알려주세요',
					ch0: '帮我们确认你是哪一位',
					ch1: '幫我們確認你是哪一位',
					fr: 'Aidez-nous à savoir qui vous êtes',
				},
				uploadedFileHeader: {
					en: 'Upload Your Converstation',
					kor: '대화를 업로드하세요',
					ch0: '上传您的对话',
					ch1: '上傳您的對話',
					fr: 'Téléchargez votre conversation',
				},
				loading: {
					en: 'Loading...',
					kor: '上传中...',
					ch0: '上传中...',
					ch1: '上傳中...',
					fr: 'Téléchargement...',
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
				addMoreDetail: {
					en: 'Let me add more detail',
					kor: '자세한 내용을 추가할게요',
					ch0: '让我补充更多细节',
					ch1: '讓我補充更多細節',
					fr: 'Laissez-moi ajouter plus de détails',
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
			hmm: {
				en: 'Hmm...',
				kor: '음...',
				ch0: '嗯...',
				ch1: '嗯...',
				fr: 'Hmm...',
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
	about: {
		header: {
			en: 'Talk Insight – AI-Based Communication Analysis',
			kor: 'Talk Insight – AI 기반 커뮤니케이션 분석',
			ch0: 'Talk Insight – 基于AI的沟通分析',
			ch1: 'Talk Insight – 基於AI的溝通分析',
			fr: "Talk Insight – Analyse de communication basée sur l'IA",
		},
		info: {
			en: '💡 Your AI-driven conversation coach, Talk Insight is an AI-powered communication analysis tool that helps users improve interpersonal conversations, resolve conflicts, and foster healthier relationships.',
			kor: '💡 당신의 AI 기반 대화 코치, Talk Insight는 사용자가 대인 간 대화를 개선하고 갈등을 해결하며 더 건강한 관계를 구축하도록 돕는 AI 기반 커뮤니케이션 분석 도구입니다.',
			ch0: '💡 您的AI驱动的对话教练，Talk Insight是一款AI驱动的沟通分析工具，帮助用户改善人际对话，解决冲突，培养更健康的关系。',
			ch1: '💡 您的AI驅動的對話教練，Talk Insight是一款AI驅動的溝通分析工具，幫助用戶改善人際對話，解決衝突，培養更健康的關係。',
			fr: "💡 Votre coach de conversation piloté par IA, Talk Insight est un outil d'analyse de communication alimenté par IA qui aide les utilisateurs à améliorer les conversations interpersonnelles, résoudre les conflits et favoriser des relations plus saines.",
		},
		background: {
			title: {
				en: 'Background',
				kor: '배경',
				ch0: '背景',
				ch1: '背景',
				fr: 'Contexte',
			},
			problem: {
				title: {
					en: 'Problem',
					kor: '문제점',
					ch0: '问题',
					ch1: '問題',
					fr: 'Problème',
				},
				info: {
					en: 'Miscommunication is a common issue in relationships, workplaces, and online spaces. It leads to conflicts, emotional manipulation, and societal divides. Legal disputes often require structured message analysis, which can be challenging without the right tools.',
					kor: '의사소통 오류는 관계, 직장, 온라인 공간에서 흔한 문제입니다. 이는 갈등, 감정적 조작, 사회적 분열을 초래합니다. 법적 분쟁은 종종 구조화된 메시지 분석을 필요로 하지만, 적절한 도구 없이는 어려울 수 있습니다.',
					ch0: '沟通不畅是人际关系、工作场所和网络空间中的常见问题。它导致冲突、情感操纵和社会分裂。法律纠纷通常需要结构化的信息分析，这在没有合适的工具时可能具有挑战性。',
					ch1: '溝通不暢是人際關係、工作場所和網絡空間中的常見問題。它導致衝突、情感操縱和社會分裂。法律糾紛通常需要結構化的信息分析，這在沒有合適的工具時可能具有挑戰性。',
					fr: 'Les malentendus sont un problème courant dans les relations, les lieux de travail et les espaces en ligne. Ils entraînent des conflits, des manipulations émotionnelles et des divisions sociétales. Les litiges juridiques nécessitent souvent une analyse structurée des messages, ce qui peut être difficile sans les bons outils.',
				},
			},
			solution: {
				title: {
					en: 'Solution',
					kor: '해결책',
					ch0: '解决方案',
					ch1: '解決方案',
					fr: 'Solution',
				},
				info: {
					en: 'Talk Insight leverages AI to analyze conversations, detect communication patterns, and provide actionable insights to resolve conflicts and improve communication.',
					kor: 'Talk Insight는 AI를 활용하여 대화를 분석하고, 커뮤니케이션 패턴을 감지하며, 갈등 해결과 커뮤니케이션 개선을 위한 실행 가능한 인사이트를 제공합니다.',
					ch0: 'Talk Insight利用AI分析对话，检测沟通模式，并提供可操作的见解来解决冲突和改善沟通。',
					ch1: 'Talk Insight利用AI分析對話，檢測溝通模式，並提供可操作的見解來解決衝突和改善溝通。',
					fr: "Talk Insight utilise l'IA pour analyser les conversations, détecter les schémas de communication et fournir des informations exploitables pour résoudre les conflits et améliorer la communication.",
				},
			},
		},
		targetAudience: {
			title: {
				en: 'Target Audience',
				kor: '대상 고객',
				ch0: '目标受众',
				ch1: '目標受眾',
				fr: 'Public cible',
			},
			couples: {
				title: {
					en: 'Couples',
					kor: '커플',
					ch0: '情侣',
					ch1: '情侶',
					fr: 'Couples',
				},
				info: {
					en: 'Analyze relationship dynamics and improve communication.',
					kor: '관계 역학을 분석하고 커뮤니케이션을 개선합니다.',
					ch0: '分析关系动态并改善沟通。',
					ch1: '分析關係動態並改善溝通。',
					fr: 'Analyser les dynamiques relationnelles et améliorer la communication.',
				},
			},
			families: {
				title: {
					en: 'Families',
					kor: '가족',
					ch0: '家庭',
					ch1: '家庭',
					fr: 'Familles',
				},
				info: {
					en: 'Reduce conflicts and foster understanding between parents and children.',
					kor: '부모와 자녀 간의 갈등을 줄이고 이해를 촉진합니다.',
					ch0: '减少父母和孩子之间的冲突，促进理解。',
					ch1: '減少父母和孩子之間的衝突，促進理解。',
					fr: 'Réduire les conflits et favoriser la compréhension entre parents et enfants.',
				},
			},
			professionals: {
				title: {
					en: 'Workplace Professionals',
					kor: '직장인',
					ch0: '职场专业人士',
					ch1: '職場專業人士',
					fr: 'Professionnels en milieu de travail',
				},
				info: {
					en: 'Enhance team communication and resolve workplace conflicts.',
					kor: '팀 커뮤니케이션을 향상시키고 직장 내 갈등을 해결합니다.',
					ch0: '提升团队沟通，解决职场冲突。',
					ch1: '提升團隊溝通，解決職場衝突。',
					fr: 'Améliorez la communication d’équipe et résolvez les conflits au travail.',
				},
			},
			legalClients: {
				title: {
					en: 'Legal Clients',
					kor: '법률 고객',
					ch0: '法律客户',
					ch1: '法律客戶',
					fr: 'Clients juridiques',
				},
				info: {
					en: 'Use AI-powered message analysis for disputes like divorce or harassment.',
					kor: '이혼이나 괴롭힘과 같은 분쟁에 AI 기반 메시지 분석을 활용합니다.',
					ch0: '使用AI驱动的信息分析处理如离婚或骚扰等纠纷。',
					ch1: '使用AI驅動的信息分析處理如離婚或騷擾等糾紛。',
					fr: 'Utilisez l’analyse de messages par IA pour des litiges comme le divorce ou le harcèlement.',
				},
			},
			communityModerators: {
				title: {
					en: 'Community Moderators',
					kor: '커뮤니티 관리자',
					ch0: '社区管理员',
					ch1: '社區管理員',
					fr: 'Modérateurs de communauté',
				},
				info: {
					en: 'Reduce toxicity in online spaces.',
					kor: '온라인 공간의 유해성을 줄입니다.',
					ch0: '减少网络空间中的恶意行为。',
					ch1: '減少網絡空間中的惡意行為。',
					fr: 'Réduisez la toxicité dans les espaces en ligne.',
				},
			},
			politicalAnalysts: {
				title: {
					en: 'Political & Social Analysts',
					kor: '정치 및 사회 분석가',
					ch0: '政治和社会分析师',
					ch1: '政治和社會分析師',
					fr: 'Analystes politiques et sociaux',
				},
				info: {
					en: 'Study polarization in online discussions.',
					kor: '온라인 토론에서의 양극화를 연구합니다.',
					ch0: '研究网络讨论中的两极分化现象。',
					ch1: '研究網絡討論中的兩極分化現象。',
					fr: 'Étudiez la polarisation dans les discussions en ligne.',
				},
			},
			mentalHealthExperts: {
				title: {
					en: 'Mental Health Experts',
					kor: '정신 건강 전문가',
					ch0: '心理健康专家',
					ch1: '心理健康專家',
					fr: 'Experts en santé mentale',
				},
				info: {
					en: 'Gain insights into patients’ communication behaviors.',
					kor: '환자의 커뮤니케이션 행동에 대한 인사이트를 얻습니다.',
					ch0: '深入了解患者的沟通行为。',
					ch1: '深入了解患者的溝通行為。',
					fr: 'Obtenez des informations sur les comportements de communication des patients.',
				},
			},
		},
		features: {
			title: {
				en: 'Main Features',
				kor: '주요 기능',
				ch0: '主要功能',
				ch1: '主要功能',
				fr: 'Fonctionnalités principales',
			},
			insights: {
				title: {
					en: 'Conversation Analysis & Insights',
					kor: '대화 분석 및 인사이트',
					ch0: '对话分析与洞察',
					ch1: '對話分析與洞察',
					fr: 'Analyse des conversations et insights',
				},
				info: {
					en: 'Detect emotional tone, toxic language, and communication patterns.',
					kor: '감정 톤, 유해한 언어, 소통 패턴을 감지합니다.',
					ch0: '检测情绪语调、有害语言和沟通模式。',
					ch1: '偵測情緒語調、有害語言和溝通模式。',
					fr: 'Détectez le ton émotionnel, le langage toxique et les schémas de communication.',
				},
			},
			legal: {
				title: {
					en: 'Legal & Dispute Resolution Tools',
					kor: '법률 및 분쟁 해결 도구',
					ch0: '法律与争议解决工具',
					ch1: '法律與爭議解決工具',
					fr: 'Outils juridiques et de résolution de conflits',
				},
				info: {
					en: 'Identify gaslighting, coercion, and generate legal evidence reports.',
					kor: '가스라이팅, 강요를 식별하고 법적 증거 보고서를 생성합니다.',
					ch0: '识别煤气灯效应、胁迫并生成法律证据报告。',
					ch1: '識別煤氣燈效應、脅迫並生成法律證據報告。',
					fr: 'Identifiez les manipulations, la coercition et générez des rapports de preuves juridiques.',
				},
			},
			socialSolutions: {
				title: {
					en: 'Social & Workplace Solutions',
					kor: '사회 및 직장 솔루션',
					ch0: '社交与职场解决方案',
					ch1: '社交與職場解決方案',
					fr: 'Solutions sociales et professionnelles',
				},
				info: {
					en: 'Improve team communication and reduce toxicity in online communities.',
					kor: '팀 커뮤니케이션을 개선하고 온라인 커뮤니티의 유해성을 줄입니다.',
					ch0: '提升团队沟通，减少线上社区的有害行为。',
					ch1: '提升團隊溝通，減少線上社群的有害行為。',
					fr: 'Améliorez la communication d’équipe et réduisez la toxicité des communautés en ligne.',
				},
			},
			communicationCoach: {
				title: {
					en: 'AI-Powered Communication Coach',
					kor: 'AI 기반 커뮤니케이션 코치',
					ch0: 'AI 驱动的沟通教练',
					ch1: 'AI 驅動的溝通教練',
					fr: 'Coach de communication alimenté par l’IA',
				},
				info: {
					en: 'Provide feedback and empathetic response suggestions.',
					kor: '피드백과 공감 기반의 응답 제안을 제공합니다.',
					ch0: '提供反馈和富有同理心的回应建议。',
					ch1: '提供回饋和富有同理心的回應建議。',
					fr: 'Fournit des retours et des suggestions de réponses empathiques.',
				},
			},
			visualization: {
				title: {
					en: 'Visualization of Communication Data',
					kor: '커뮤니케이션 데이터 시각화',
					ch0: '沟通数据可视化',
					ch1: '溝通數據可視化',
					fr: 'Visualisation des données de communication',
				},
				info: {
					en: 'Track trends, conflict history, and relationship dynamics over time.',
					kor: '시간에 따른 트렌드, 갈등 이력, 관계 변화를 추적합니다.',
					ch0: '跟踪趋势、冲突历史和关系动态变化。',
					ch1: '追蹤趨勢、衝突歷史和關係動態變化。',
					fr: 'Suivez les tendances, l’historique des conflits et la dynamique des relations au fil du temps.',
				},
			},
		},
		learnMoreLink: {
			text: {
				en: 'You can learn how to use the Talk Insight AI by visiting the about page.',
				kor: '소개 페이지를 방문하면 Talk Insight AI 사용법을 더 자세히 알 수 있습니다.',
				ch0: '您可以访问关于页面，了解如何使用 Talk Insight AI。',
				ch1: '您可以訪問關於頁面，了解如何使用 Talk Insight AI。',
				fr: 'Vous pouvez en apprendre davantage sur l’utilisation de Talk Insight AI en visitant la page à propos.',
			},
			linkWord: {
				en: 'about',
				kor: '소개',
				ch0: '关于',
				ch1: '關於',
				fr: 'à propos',
			},
		},
	},
} as const
