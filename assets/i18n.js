/* Interface wording. Field translations live next to their Russian originals in config/fields.json. */
window.MCDCI_I18N={
 ru:{title:'Запрос на проектирование и строительство ЦОД',badge:'Анкета проекта',language:'Язык формы',sections:'Разделы формы',review:'Проверка ответов',reviewTitle:'Проверьте ответы',unknown:'Пока неизвестно',empty:'Не указано',back:'Назад',next:'Продолжить →',download:'Скачать PDF',preparing:'Подготовка PDF…',edit:'Изменить',step:'Шаг {current} из {total}',notice:'Ответы не сохраняются при перезагрузке страницы.',limit:'Не более {max} символов.',decimal:'Введите неотрицательное число: до 9 цифр до запятой и 3 после.',integer:'Введите целое неотрицательное число, до 9 цифр.',option:'Выберите ответ из списка.',email:'Введите корректный email, например name@example.com.',pdfError:'Не удалось создать PDF. Проверьте, что все файлы плагина на месте, и повторите скачивание.',filename:'Майнинг-Кластер-Запрос-ЦОД.pdf',pdfStage:'Этап реализации: запрос исходных данных',brand:'Майнинг Кластер'},
 en:{title:'Data Center Design and Construction Inquiry',badge:'Project questionnaire',language:'Form language',sections:'Form sections',review:'Review',reviewTitle:'Review your answers',unknown:'Not yet known',empty:'Not provided',back:'Back',next:'Continue →',download:'Download PDF',preparing:'Preparing PDF…',edit:'Edit',step:'Step {current} of {total}',notice:'Your answers will be lost if you reload the page.',limit:'Use no more than {max} characters.',decimal:'Enter a non-negative number with up to 9 digits before the decimal separator and 3 after it.',integer:'Enter a non-negative whole number with up to 9 digits.',option:'Select an answer from the list.',email:'Enter a valid email address, for example name@example.com.',pdfError:'Unable to create the PDF. Check that all plugin files are present, then try downloading again.',filename:'Mining-Cluster-Data-Center-Inquiry.pdf',pdfStage:'Project brief: initial information request',brand:'Mining Cluster'}
};

Object.assign(window.MCDCI_I18N.ru,{
 translationConsent:'Разрешаю передать текстовые ответы OpenRouter и провайдеру модели для перевода на русский язык в PDF. Контактные данные из отдельных полей не передаются.',
 consentRequired:'Подтвердите передачу текстовых ответов для перевода на русский язык.',
 translating:'Перевод ответов и подготовка PDF…',
 translationSetup:'Перевод не подключён. Обратитесь к администратору сайта. Для локальной страницы перевод недоступен.',
 translationError:'Не удалось перевести ответы. Повторите скачивание позже. Если ошибка сохраняется, обратитесь к администратору сайта.',
 translationExpired:'Срок подключения истёк. Скопируйте свои ответы перед обновлением страницы, затем заполните форму повторно.'
});
Object.assign(window.MCDCI_I18N.en,{
 translationConsent:'I agree to send my text answers to OpenRouter and its model provider for translation into Russian in the PDF. Separate contact detail fields are not sent.',
 consentRequired:'Please agree to send your text answers for translation into Russian.',
 translating:'Translating answers and preparing the PDF…',
 translationSetup:'Translation is not configured. Please contact the site administrator. Translation is unavailable in the local preview.',
 translationError:'Unable to translate your answers. Please try downloading again later. If the problem persists, contact the site administrator.',
 translationExpired:'Your connection has expired. Copy your answers before refreshing the page, then complete the form again.'
});
