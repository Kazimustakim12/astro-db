import { Controller, useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import { useTranslations } from '@/i18n'

export default function ContactForm({ lang }) {
	const [status, setStatus] = useState('')
	const [statusCode, setStatusCode] = useState('')
	const t = useTranslations(lang)
	useEffect(() => {
		const spinner = document.querySelector('.spinner')
		if (spinner) spinner.remove()
	}, [])
	const {
		register,
		handleSubmit,
		isDirty,
		formState: { errors },
		watch,
		getValues,
		control
	} = useForm()
	// const onSubmit = (data) => console.log(data)
	const onSubmit = async (data) => {
		setStatus(
			t({
				en: 'Sending...',
				ar: 'جاري الإرسال...',
				es: 'Enviando...',
				fr: 'Envoi en cours...',
				hi: 'भेजा जा रहा है...',
				id: 'Mengirim...',
				ms: 'Menghantar...',
				th: 'กำลังส่ง...',
				vi: 'Đang gửi...',
				bn: 'পাঠানো হচ্ছে...',
				'zh-hans': '发送中...',
				'pt-br': 'Enviando...'
			})
		)
		console.log(data, 'Data')

		try {
			const response = await fetch('/api/sendemail', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			})

			const result = await response.json()

			if (result.success) {
				setStatus(
					t({
						en: 'Email sent successfully!',
						ar: 'تم إرسال البريد الإلكتروني بنجاح!',
						es: '¡Correo electrónico enviado con éxito!',
						fr: 'Email envoyé avec succès !',
						hi: 'ईमेल सफलतापूर्वक भेजा गया!',
						id: 'Email berhasil dikirim!',
						ms: 'Emel dihantar dengan jayanya!',
						th: 'ส่งอีเมลเรียบร้อยแล้ว!',
						vi: 'Email đã được gửi thành công!',
						bn: 'ইমেইল সফলভাবে পাঠানো হয়েছে!',
						'zh-hans': '电子邮件发送成功！',
						'pt-br': 'Email enviado com sucesso!'
					})
				)
				setStatusCode(result.success)
			} else {
				setStatus(
					t({
						en: 'Failed to send email.',
						ar: 'فشل في إرسال البريد الإلكتروني.',
						es: 'Error al enviar el correo electrónico.',
						fr: "Échec de l'envoi de l'email.",
						hi: 'ईमेल भेजने में विफल.',
						id: 'Gagal mengirim email.',
						ms: 'Gagal menghantar emel.',
						th: 'ส่งอีเมลล้มเหลว.',
						vi: 'Gửi email thất bại.',
						bn: 'ইমেইল পাঠাতে ব্যর্থ হয়েছে।',
						'zh-hans': '发送电子邮件失败。',
						'pt-br': 'Falha ao enviar o email.'
					})
				)
			}
		} catch (error) {
			setStatus(
				t({
					en: 'Error occurred while sending email.',
					ar: 'حدث خطأ أثناء إرسال البريد الإلكتروني.',
					es: 'Ocurrió un error al enviar el correo electrónico.',
					fr: "Une erreur s'est produite lors de l'envoi de l'email.",
					hi: 'ईमेल भेजने में एक त्रुटि हुई।',
					id: 'Terjadi kesalahan saat mengirim email.',
					ms: 'Ralat berlaku semasa menghantar emel.',
					th: 'เกิดข้อผิดพลาดขณะส่งอีเมล.',
					vi: 'Đã xảy ra lỗi khi gửi email.',
					bn: 'ইমেইল পাঠানোর সময় একটি ত্রুটি ঘটেছে।',
					'zh-hans': '发送电子邮件时发生错误。',
					'pt-br': 'Ocorreu um erro ao enviar o email.'
				})
			)
		}
	}
	console.log(errors)
	const isClient = watch('client')

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="mb-4">
				<label className="text-md mb-2 block font-bold text-green-500">
					{t({
						en: 'Existing Client:',
						ar: 'عميل حالي:',
						es: 'Cliente existente:',
						fr: 'Client existant :',
						hi: 'मौजूदा ग्राहक:',
						id: 'Klien yang ada:',
						ms: 'Pelanggan Sedia Ada:',
						th: 'ลูกค้าปัจจุบัน:',
						vi: 'Khách hàng hiện tại:',
						bn: 'বিদ্যমান ক্লায়েন্ট:',
						'zh-hans': '现有客户：',
						'pt-br': 'Cliente existente:'
					})}{' '}
					<span className="text-red-500">*</span>
				</label>
				<select
					className="w-full rounded border border-gray-600 p-2"
					{...register('client', {
						required: t({
							en: 'Please select at least one option',
							ar: 'يرجى اختيار خيار واحد على الأقل',
							es: 'Por favor selecciona al menos una opción',
							fr: 'Veuillez sélectionner au moins une option',
							hi: 'कृपया कम से कम एक विकल्प चुनें',
							id: 'Silakan pilih setidaknya satu opsi',
							ms: 'Sila pilih sekurang-kurangnya satu pilihan',
							th: 'โปรดเลือกอย่างน้อยหนึ่งตัวเลือก',
							vi: 'Vui lòng chọn ít nhất một tùy chọn',
							bn: 'দয়া করে অন্তত একটি বিকল্প নির্বাচন করুন',
							'zh-hans': '请至少选择一个选项',
							'pt-br': 'Por favor, selecione pelo menos uma opção'
						})
					})}
				>
					<option value="No">
						{t({
							en: 'No',
							ar: 'لا',
							es: 'No',
							fr: 'Non',
							hi: 'नहीं',
							id: 'Tidak',
							ms: 'Tidak',
							th: 'ไม่',
							vi: 'Không',
							bn: 'না',
							'zh-hans': '不',
							'pt-br': 'Não'
						})}
					</option>
					<option value="yes">
						{t({
							en: 'Yes',
							ar: 'نعم',
							es: 'Sí',
							fr: 'Oui',
							hi: 'हाँ',
							id: 'Ya',
							ms: 'Ya',
							th: 'ใช่',
							vi: 'Có',
							bn: 'হ্যাঁ',
							'zh-hans': '是',
							'pt-br': 'Sim'
						})}
					</option>
				</select>
				{errors?.client && <p className="mt-2 text-sm text-red-600">{errors?.client?.message}</p>}
			</div>
			{isClient === 'yes' && (
				<div className="mb-4">
					<label className="text-md mb-2 block font-bold text-green-500">
						{t({
							en: 'Client ID: ',
							ar: 'معرف العميل: ',
							es: 'ID del cliente: ',
							fr: 'ID client : ',
							hi: 'क्लाइंट आईडी: ',
							id: 'ID Klien: ',
							ms: 'ID Pelanggan: ',
							th: 'รหัสลูกค้า: ',
							vi: 'ID khách hàng: ',
							bn: 'ক্লায়েন্ট আইডি: ',
							'zh-hans': '客户ID：',
							'pt-br': 'ID do Cliente: '
						})}{' '}
						<span className="text-red-500">*</span>
					</label>
					<input
						className="w-full rounded border border-gray-600 p-2"
						type="number"
						placeholder="Your Client ID"
						{...register('clientId', {
							required: t({
								en: 'This is required',
								ar: 'هذا مطلوب',
								es: 'Esto es requerido',
								fr: 'Ceci est requis',
								hi: 'यह आवश्यक है',
								id: 'Ini diperlukan',
								ms: 'Ini diperlukan',
								th: 'สิ่งนี้จำเป็น',
								vi: 'Điều này là bắt buộc',
								bn: 'এটি আবশ্যক',
								'zh-hans': '这是必需的',
								'pt-br': 'Isto é necessário'
							})
						})}
					/>
					{errors?.clientId && (
						<p className="mt-2 text-sm text-red-600">{errors?.clientId?.message}</p>
					)}
				</div>
			)}
			<div className="mb-4">
				<label className="text-md mb-2 block font-bold text-green-500">
					{t({
						en: 'Full Name:',
						ar: 'الاسم الكامل:',
						es: 'Nombre completo:',
						fr: 'Nom complet :',
						hi: 'पूरा नाम:',
						id: 'Nama Lengkap:',
						ms: 'Nama Penuh:',
						th: 'ชื่อเต็ม:',
						vi: 'Họ và tên:',
						bn: 'পূর্ণ নাম:',
						'zh-hans': '全名：',
						'pt-br': 'Nome completo:'
					})}{' '}
					<span className="text-red-500">*</span>
				</label>
				<input
					className="w-full rounded border border-gray-600 p-2"
					type="text"
					placeholder="Full Name"
					{...register('fullName', {
						required: t({
							en: 'This is required',
							ar: 'هذا مطلوب',
							es: 'Esto es requerido',
							fr: 'Ceci est requis',
							hi: 'यह आवश्यक है',
							id: 'Ini diperlukan',
							ms: 'Ini diperlukan',
							th: 'สิ่งนี้จำเป็น',
							vi: 'Điều này là bắt buộc',
							bn: 'এটি আবশ্যক',
							'zh-hans': '这是必需的',
							'pt-br': 'Isto é necessário'
						})
					})}
				/>
				{errors?.fullName && (
					<p className="mt-2 text-sm text-red-600">{errors?.fullName?.message}</p>
				)}
			</div>
			<div className="mb-4">
				<label className="text-md mb-2 block font-bold text-green-500">
					{t({
						en: 'Type of Query:',
						ar: 'نوع الاستفسار:',
						es: 'Tipo de consulta:',
						fr: 'Type de requête :',
						hi: 'प्रश्न का प्रकार:',
						id: 'Jenis Pertanyaan:',
						ms: 'Jenis Pertanyaan:',
						th: 'ประเภทคำถาม:',
						vi: 'Loại truy vấn:',
						bn: 'প্রশ্নের ধরন:',
						'zh-hans': '查询类型：',
						'pt-br': 'Tipo de Consulta:'
					})}{' '}
					<span className="text-red-500">*</span>
				</label>
				<select
					className="w-full rounded border border-gray-600 p-2"
					{...register('query', {
						required: t({
							en: 'This is required',
							ar: 'هذا مطلوب',
							es: 'Esto es requerido',
							fr: 'Ceci est requis',
							hi: 'यह आवश्यक है',
							id: 'Ini diperlukan',
							ms: 'Ini diperlukan',
							th: 'สิ่งนี้จำเป็น',
							vi: 'Điều này là bắt buộc',
							bn: 'এটি আবশ্যক',
							'zh-hans': '这是必需的',
							'pt-br': 'Isto é necessário'
						})
					})}
				>
					<option value="General Enquiry">
						{t({
							en: 'General Enquiry (no client)',
							ar: 'استفسار عام (لا عميل)',
							es: 'Consulta general (sin cliente)',
							fr: 'Demande générale (sans client)',
							hi: 'सामान्य पूछताछ (कोई ग्राहक नहीं)',
							id: 'Pertanyaan Umum (tanpa klien)',
							ms: 'Pertanyaan Umum (tiada pelanggan)',
							th: 'การสอบถามทั่วไป (ไม่มีลูกค้า)',
							vi: 'Yêu cầu chung (không có khách hàng)',
							bn: 'সাধারণ অনুসন্ধান (কোন ক্লায়েন্ট নেই)',
							'zh-hans': '一般咨询（无客户）',
							'pt-br': 'Consulta Geral (sem cliente)'
						})}
					</option>
					<option value="Onboarding Support">
						{t({
							en: 'Onboarding Support',
							ar: 'دعم الانضمام',
							es: 'Soporte de incorporación',
							fr: "Support à l'intégration",
							hi: 'ऑनबोर्डिंग सहायता',
							id: 'Dukungan Onboarding',
							ms: 'Sokongan Onboarding',
							th: 'การสนับสนุนการเริ่มต้น',
							vi: 'Hỗ trợ onboarding',
							bn: 'অনবোর্ডিং সহায়তা',
							'zh-hans': '入职支持',
							'pt-br': 'Suporte de Onboarding'
						})}
					</option>
					<option value="Deposit Support">
						{t({
							en: 'Deposit Support',
							ar: 'دعم الإيداع',
							es: 'Soporte de depósito',
							fr: 'Support de dépôt',
							hi: 'जमा सहायता',
							id: 'Dukungan Setoran',
							ms: 'Sokongan Deposit',
							th: 'การสนับสนุนการฝากเงิน',
							vi: 'Hỗ trợ gửi tiền',
							bn: 'ডিপোজিট সাপোর্ট',
							'zh-hans': '存款支持',
							'pt-br': 'Suporte de Depósito'
						})}
					</option>
					<option value="Withdrawal Support">
						{t({
							en: 'Withdrawal Support',
							ar: 'دعم السحب',
							es: 'Soporte de retiro',
							fr: 'Support de retrait',
							hi: 'निकासी सहायता',
							id: 'Dukungan Penarikan',
							ms: 'Sokongan Pengeluaran',
							th: 'การสนับสนุนการถอนเงิน',
							vi: 'Hỗ trợ rút tiền',
							bn: 'অ্যাপয়েন্টমেন্ট সাপোর্ট',
							'zh-hans': '提款支持',
							'pt-br': 'Suporte de Retirada'
						})}
					</option>
					<option value="Technical Issue Support">
						{t({
							en: 'Technical Issue Support',
							ar: 'دعم المشكلات التقنية',
							es: 'Soporte de problemas técnicos',
							fr: 'Support technique',
							hi: 'तकनीकी समस्या सहायता',
							id: 'Dukungan Masalah Teknis',
							ms: 'Sokongan Masalah Teknikal',
							th: 'การสนับสนุนปัญหาทางเทคนิค',
							vi: 'Hỗ trợ sự cố kỹ thuật',
							bn: 'প্রযুক্তিগত সমস্যা সমর্থন',
							'zh-hans': '技术问题支持',
							'pt-br': 'Suporte para Problemas Técnicos'
						})}
					</option>
					<option value="Complaint">
						{t({
							en: 'Complaint',
							ar: 'شكوى',
							es: 'Queja',
							fr: 'Réclamation',
							hi: 'शिकायत',
							id: 'Keluhan',
							ms: 'Aduan',
							th: 'คำร้องเรียน',
							vi: 'Khiếu nại',
							bn: 'অভিযোগ',
							'zh-hans': '投诉',
							'pt-br': 'Reclamação'
						})}
					</option>
				</select>
				{errors?.query && <p className="mt-2 text-sm text-red-600">{errors?.query?.message}</p>}
			</div>
			<div className="mb-4">
				<label className="text-md mb-2 block font-bold text-green-500">
					{t({
						en: 'Language preferred for support:',
						ar: 'اللغة المفضلة للدعم:',
						es: 'Idioma preferido para soporte:',
						fr: 'Langue préférée pour le support :',
						hi: 'सहायता के लिए पसंदीदा भाषा:',
						id: 'Bahasa yang diinginkan untuk dukungan:',
						ms: 'Bahasa yang disukai untuk sokongan:',
						th: 'ภาษาที่ต้องการสำหรับการสนับสนุน:',
						vi: 'Ngôn ngữ ưa thích để hỗ trợ:',
						bn: 'সমর্থনের জন্য পছন্দসই ভাষা:',
						'zh-hans': '支持时首选的语言：',
						'pt-br': 'Idioma preferido para suporte:'
					})}{' '}
					<span className="text-red-500">*</span>
				</label>
				<select
					className="w-full rounded border border-gray-600 p-2"
					{...register('language', {
						required: t({
							en: 'This is required',
							ar: 'هذا مطلوب',
							es: 'Esto es requerido',
							fr: 'Ceci est requis',
							hi: 'यह आवश्यक है',
							id: 'Ini diperlukan',
							ms: 'Ini diperlukan',
							th: 'สิ่งนี้จำเป็น',
							vi: 'Điều này là bắt buộc',
							bn: 'এটি আবশ্যক',
							'zh-hans': '这是必需的',
							'pt-br': 'Isto é necessário'
						})
					})}
				>
					<option value="English">
						{t({
							en: 'English',
							ar: 'الإنجليزية',
							es: 'Inglés',
							fr: 'Anglais',
							hi: 'अंग्रेज़ी',
							id: 'Inggris',
							ms: 'Inggeris',
							th: 'อังกฤษ',
							vi: 'Tiếng Anh',
							bn: 'ইংরেজি',
							'zh-hans': '英语',
							'pt-br': 'Inglês'
						})}
					</option>
					<option value="Arabic">
						{t({
							en: 'Arabic',
							ar: 'العربية',
							es: 'Árabe',
							fr: 'Arabe',
							hi: 'अरबी',
							id: 'Arab',
							ms: 'Arab',
							th: 'อาหรับ',
							vi: 'Tiếng Ả Rập',
							bn: 'আরবি',
							'zh-hans': '阿拉伯语',
							'pt-br': 'Árabe'
						})}
					</option>
					<option value="Spanish">
						{t({
							en: 'Spanish',
							ar: 'الإسبانية',
							es: 'Español',
							fr: 'Espagnol',
							hi: 'स्पेनिश',
							id: 'Spanyol',
							ms: 'Sepanyol',
							th: 'สเปน',
							vi: 'Tiếng Tây Ban Nha',
							bn: 'স্প্যানিশ',
							'zh-hans': '西班牙语',
							'pt-br': 'Espanhol'
						})}
					</option>
					<option value="Portuguese">
						{t({
							en: 'Portuguese',
							ar: 'البرتغالية',
							es: 'Portugués',
							fr: 'Portugais',
							hi: 'पुर्तगाली',
							id: 'Portugis',
							ms: 'Portugis',
							th: 'โปรตุเกส',
							vi: 'Tiếng Bồ Đào Nha',
							bn: 'পোর্টুগিজ',
							'zh-hans': '葡萄牙语',
							'pt-br': 'Português'
						})}
					</option>
				</select>
				{errors?.language && (
					<p className="mt-2 text-sm text-red-600">{errors?.language?.message}</p>
				)}
			</div>
			<div className="mb-4">
				<label className="text-md mb-2 block font-bold text-green-500">
					{t({
						en: 'Email:',
						ar: 'البريد الإلكتروني:',
						es: 'Correo electrónico:',
						fr: 'E-mail :',
						hi: 'ईमेल:',
						id: 'Email:',
						ms: 'Emel:',
						th: 'อีเมล:',
						vi: 'Email:',
						bn: 'ইমেইল:',
						'zh-hans': '电子邮件：',
						'pt-br': 'E-mail:'
					})}{' '}
					<span className="text-red-500">*</span>
				</label>
				<input
					className="w-full rounded border border-gray-600 p-2 placeholder:text-neutral-400"
					type="text"
					placeholder="Email"
					{...register('email', {
						required: t({
							en: 'Invalid email. Email must be a valid email address.',
							ar: 'البريد الإلكتروني غير صالح. يجب أن يكون البريد الإلكتروني عنوان بريد إلكتروني صالحًا.',
							es: 'Correo electrónico no válido. El correo electrónico debe ser una dirección de correo electrónico válida.',
							fr: "Email invalide. L'email doit être une adresse email valide.",
							hi: 'अमान्य ईमेल। ईमेल एक मान्य ईमेल पता होना चाहिए।',
							id: 'Email tidak valid. Email harus berupa alamat email yang valid.',
							ms: 'Emel tidak sah. Emel mesti merupakan alamat emel yang sah.',
							th: 'อีเมลไม่ถูกต้อง อีเมลต้องเป็นที่อยู่อีเมลที่ถูกต้อง',
							vi: 'Email không hợp lệ. Email phải là một địa chỉ email hợp lệ.',
							bn: 'অবৈধ ইমেইল। ইমেইলটি একটি বৈধ ইমেইল ঠিকানা হতে হবে।',
							'zh-hans': '无效的电子邮件。电子邮件必须是有效的电子邮件地址。',
							'pt-br': 'Email inválido. O email deve ser um endereço de email válido.'
						}),
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: t({
								en: 'Entered value does not match email format.',
								ar: 'القيمة المدخلة لا تتطابق مع تنسيق البريد الإلكتروني.',
								es: 'El valor ingresado no coincide con el formato del correo electrónico.',
								fr: "La valeur saisie ne correspond pas au format de l'email.",
								hi: 'डाली गई मान ईमेल प्रारूप से मेल नहीं खाती।',
								id: 'Nilai yang dimasukkan tidak cocok dengan format email.',
								ms: 'Nilai yang dimasukkan tidak sepadan dengan format emel.',
								th: 'ค่าที่ป้อนเข้ามาไม่ตรงกับรูปแบบอีเมล',
								vi: 'Giá trị đã nhập không khớp với định dạng email.',
								bn: 'প্রবেশ করা মান ইমেইল ফরম্যাটের সাথে মেলে না।',
								'zh-hans': '输入的值与电子邮件格式不匹配。',
								'pt-br': 'O valor inserido não corresponde ao formato do email.'
							})
						}
					})}
				/>
				{errors?.email && <p className="mt-2 text-sm text-red-600">{errors?.email?.message}</p>}
			</div>
			<div className="mb-4">
				<label className="text-md mb-2 block font-bold text-green-500">
					{t({
						en: 'Phone:',
						ar: 'الهاتف:',
						es: 'Teléfono:',
						fr: 'Téléphone :',
						hi: 'फोन:',
						id: 'Telepon:',
						ms: 'Telefon:',
						th: 'โทรศัพท์:',
						vi: 'Điện thoại:',
						bn: 'ফোন:',
						'zh-hans': '电话：',
						'pt-br': 'Telefone:'
					})}{' '}
					<span className="text-red-500">*</span>
				</label>
				<Controller
					control={control}
					name="phone"
					render={({ field: { onChange, onBlur, value, ref } }) => (
						<PhoneInput defaultCountry="ua" value={value} onChange={onChange} onBlur={onBlur} />
					)}
				/>
				{/* <input
					className="w-full rounded border border-gray-600 p-2 placeholder:text-neutral-400"
					type="tel"
					placeholder="Phone Number"
					{...register('phoneNumber', { required: t({
	"en": "This is required",
	"ar": "هذا مطلوب",
	"es": "Esto es requerido",
	"fr": "Ceci est requis",
	"hi": "यह आवश्यक है",
	"id": "Ini diperlukan",
	"ms": "Ini diperlukan",
	"th": "สิ่งนี้จำเป็น",
	"vi": "Điều này là bắt buộc",
	"bn": "এটি আবশ্যক",
	"zh-hans": "这是必需的",
	"pt-br": "Isto é necessário"
}
) })}
				/> */}
				{errors?.phoneNumber && (
					<p className="mt-2 text-sm text-red-600">{errors?.phoneNumber?.message}</p>
				)}
			</div>
			<div className="mb-4">
				<label className="text-md mb-2 block font-bold text-green-500">
					{t({
						en: 'How may we contact you?',
						ar: 'كيف يمكننا الاتصال بك؟',
						es: '¿Cómo podemos contactarte?',
						fr: 'Comment pouvons-nous vous contacter ?',
						hi: 'हम आपसे कैसे संपर्क कर सकते हैं?',
						id: 'Bagaimana kami dapat menghubungi Anda?',
						ms: 'Bagaimana kami boleh menghubungi anda?',
						th: 'เราจะติดต่อคุณได้อย่างไร?',
						vi: 'Chúng tôi có thể liên hệ với bạn như thế nào?',
						bn: 'আমরা আপনাকে কিভাবে যোগাযোগ করতে পারি?',
						'zh-hans': '我们如何联系您？',
						'pt-br': 'Como podemos entrar em contato com você?'
					})}{' '}
					<span className="text-red-500">*</span>
				</label>
				<div className="mb-4 flex items-center gap-4">
					<label className="flex items-center">
						<input
							type="checkbox"
							value="email"
							className="mr-2"
							placeholder="emailContactCheck"
							{...register('emailContactCheck', {
								validate: {
									atLeastOneRequired: (value) =>
										(value && value.length >= 1) ||
										t({
											en: 'Please choose one method to contact you.',
											ar: 'يرجى اختيار وسيلة واحدة للتواصل معك.',
											es: 'Por favor, elija un método para contactarlo.',
											fr: 'Veuillez choisir un moyen de vous contacter.',
											hi: 'कृपया आपसे संपर्क करने के लिए एक विधि चुनें।',
											id: 'Silakan pilih satu metode untuk menghubungi Anda.',
											ms: 'Sila pilih satu kaedah untuk menghubungi anda.',
											th: 'กรุณาเลือกวิธีหนึ่งในการติดต่อคุณ',
											vi: 'Vui lòng chọn một phương thức để liên hệ với bạn.',
											bn: 'আমাদের সাথে যোগাযোগ করার জন্য একটি পদ্ধতি নির্বাচন করুন।',
											'zh-hans': '请选择一种联系方式。',
											'pt-br': 'Por favor, escolha um método para entrar em contato com você.'
										})
								}
							})}
						/>
						<span className="text-white">
							{t({
								en: 'Email:',
								ar: 'البريد الإلكتروني:',
								es: 'Correo electrónico:',
								fr: 'E-mail :',
								hi: 'ईमेल:',
								id: 'Email:',
								ms: 'Emel:',
								th: 'อีเมล:',
								vi: 'Email:',
								bn: 'ইমেইল:',
								'zh-hans': '电子邮件：',
								'pt-br': 'E-mail:'
							})}
						</span>
					</label>
					<label className="flex items-center">
						<input
							type="checkbox"
							value="phone"
							className="mr-2"
							placeholder="phoneContactCheck"
							{...register('emailContactCheck', {
								validate: {
									atLeastOneRequired: (value) =>
										(value && value.length >= 1) ||
										t({
											en: 'Please choose one method to contact you.',
											ar: 'يرجى اختيار وسيلة واحدة للتواصل معك.',
											es: 'Por favor, elija un método para contactarlo.',
											fr: 'Veuillez choisir un moyen de vous contacter.',
											hi: 'कृपया आपसे संपर्क करने के लिए एक विधि चुनें।',
											id: 'Silakan pilih satu metode untuk menghubungi Anda.',
											ms: 'Sila pilih satu kaedah untuk menghubungi anda.',
											th: 'กรุณาเลือกวิธีหนึ่งในการติดต่อคุณ',
											vi: 'Vui lòng chọn một phương thức để liên hệ với bạn.',
											bn: 'আমাদের সাথে যোগাযোগ করার জন্য একটি পদ্ধতি নির্বাচন করুন।',
											'zh-hans': '请选择一种联系方式。',
											'pt-br': 'Por favor, escolha um método para entrar em contato com você.'
										})
								}
							})}
						/>
						<span className="text-white">
							{t({
								en: 'Phone:',
								ar: 'الهاتف:',
								es: 'Teléfono:',
								fr: 'Téléphone :',
								hi: 'फोन:',
								id: 'Telepon:',
								ms: 'Telefon:',
								th: 'โทรศัพท์:',
								vi: 'Điện thoại:',
								bn: 'ফোন:',
								'zh-hans': '电话：',
								'pt-br': 'Telefone:'
							})}
						</span>
					</label>
				</div>
				{errors?.emailContactCheck && (
					<p className="mt-2 text-sm text-red-600">{errors?.emailContactCheck?.message}</p>
				)}
			</div>

			<div className="mb-4">
				<label className="text-md mb-2 block font-bold text-green-500">
					{t({
						en: 'Subject:',
						ar: 'الموضوع:',
						es: 'Asunto:',
						fr: 'Objet :',
						hi: 'विषय:',
						id: 'Subjek:',
						ms: 'Subjek:',
						th: 'หัวข้อ:',
						vi: 'Chủ đề:',
						bn: 'বিষয়:',
						'zh-hans': '主题：',
						'pt-br': 'Assunto:'
					})}{' '}
					<span className="text-red-500">*</span>
				</label>
				<input
					className="w-full rounded border border-gray-600 p-2 placeholder:text-neutral-400"
					type="text"
					placeholder="Subject"
					{...register('subject', {
						required: t({
							en: 'This is required',
							ar: 'هذا مطلوب',
							es: 'Esto es requerido',
							fr: 'Ceci est requis',
							hi: 'यह आवश्यक है',
							id: 'Ini diperlukan',
							ms: 'Ini diperlukan',
							th: 'สิ่งนี้จำเป็น',
							vi: 'Điều này là bắt buộc',
							bn: 'এটি আবশ্যক',
							'zh-hans': '这是必需的',
							'pt-br': 'Isto é necessário'
						})
					})}
				/>
				{errors?.subject && <p className="mt-2 text-sm text-red-600">{errors?.subject?.message}</p>}
			</div>
			<div className="mb-4">
				<label className="text-md mb-2 block font-bold text-green-500">
					{t({
						en: 'Message:',
						ar: 'رسالة:',
						es: 'Mensaje:',
						fr: 'Message :',
						hi: 'संदेश:',
						id: 'Pesan:',
						ms: 'Mesej:',
						th: 'ข้อความ:',
						vi: 'Tin nhắn:',
						bn: 'বার্তা:',
						'zh-hans': '消息：',
						'pt-br': 'Mensagem:'
					})}{' '}
					<span className="text-red-500">*</span>
				</label>
				<input
					className="w-full rounded border border-gray-600 p-2 placeholder:text-neutral-400"
					type="text"
					placeholder="Message"
					{...register('message', {
						required: t({
							en: 'This is required',
							ar: 'هذا مطلوب',
							es: 'Esto es requerido',
							fr: 'Ceci est requis',
							hi: 'यह आवश्यक है',
							id: 'Ini diperlukan',
							ms: 'Ini diperlukan',
							th: 'สิ่งนี้จำเป็น',
							vi: 'Điều này là bắt buộc',
							bn: 'এটি আবশ্যক',
							'zh-hans': '这是必需的',
							'pt-br': 'Isto é necessário'
						})
					})}
				/>
				{errors?.message && <p className="mt-2 text-sm text-red-600">{errors?.message?.message}</p>}
			</div>

			<p className={`my-6 text-sm ${setStatusCode ? 'text-green-400' : ''}`}>{status}</p>
			<button class="btn_gradient group relative inline-flex h-12 w-full items-center justify-center gap-x-2 overflow-hidden rounded-full bg-black px-6 text-center text-white transition dark:bg-white">
				<span class="relative">
					{t({
						en: 'Submit',
						ar: 'إرسال',
						es: 'Enviar',
						fr: 'Soumettre',
						hi: 'प्रस्तुत करें',
						id: 'Kirim',
						ms: 'Hantar',
						th: 'ส่ง',
						vi: 'Gửi',
						bn: 'জমা দিন',
						'zh-hans': '提交',
						'pt-br': 'Enviar'
					})}
				</span>
				<div class="animate-shine-infinite absolute inset-0 -top-[20px] flex h-[calc(100%+40px)] w-full justify-center blur-[12px]">
					<div class="relative h-full w-8 bg-white/30" />
				</div>
			</button>
		</form>
	)
}
