window.MCDCI_CONFIG = {
  "schema": [
    {
      "id": "project",
      "title": "О проекте",
      "fields": [
        {
          "id": "format",
          "label": "Формат объекта",
          "options": [
            "Новое строительство",
            "Расширение ЦОДа"
          ],
          "labelEn": "Project type",
          "optionsEn": [
            "New construction",
            "Expansion of an existing data center"
          ]
        },
        {
          "id": "stage",
          "label": "Стадия проекта",
          "options": [
            "Предварительная оценка затрат",
            "Подбор площадки",
            "Площадка определена",
            "Проектирование",
            "Строительство"
          ],
          "labelEn": "Project stage",
          "optionsEn": [
            "Preliminary cost assessment",
            "Site selection",
            "Site selected",
            "Design",
            "Construction"
          ]
        },
        {
          "id": "power_total",
          "label": "Общая потребляемая мощность объекта, МВт",
          "type": "number",
          "maxLength": 13,
          "integerDigits": 9,
          "decimalDigits": 3,
          "labelEn": "Total facility power demand, MW"
        },
        {
          "id": "mode",
          "label": "Вариант электроснабжения",
          "options": [
            "Электросеть",
            "Газовая генерация",
            "Смешанный вариант",
            "Пока не определились — нужна помощь с выбором"
          ],
          "unknown": false,
          "labelEn": "Power supply arrangement",
          "optionsEn": [
            "Utility grid",
            "Gas-fired generation",
            "Utility grid and gas-fired generation",
            "Undecided — advice needed"
          ]
        },
        {
          "id": "launch",
          "label": "Желаемый срок запуска",
          "type": "text",
          "maxLength": 100,
          "labelEn": "Target commissioning date"
        }
      ],
      "titleEn": "Project overview"
    },
    {
      "id": "site",
      "title": "Площадка и электроснабжение",
      "fields": [
        {
          "id": "location",
          "label": "Регион, адрес или координаты",
          "type": "text",
          "maxLength": 300,
          "labelEn": "Region, address or coordinates"
        },
        {
          "id": "area",
          "label": "Доступная для строительства площадь, м²",
          "type": "number",
          "maxLength": 13,
          "integerDigits": 9,
          "decimalDigits": 3,
          "labelEn": "Land area available for construction, m²"
        },
        {
          "id": "land_rights",
          "label": "Права на участок",
          "options": [
            "Собственность",
            "Аренда",
            "Оформляются",
            "Площадка ещё не выбрана"
          ],
          "labelEn": "Land tenure",
          "optionsEn": [
            "Owned",
            "Leased",
            "Land rights being formalized",
            "Site not yet selected"
          ]
        },
        {
          "id": "cadastre",
          "label": "Кадастровый номер",
          "type": "text",
          "maxLength": 50,
          "labelEn": "Cadastral number"
        },
        {
          "id": "land_use",
          "label": "Назначение земли и разрешённое использование",
          "type": "textarea",
          "maxLength": 1000,
          "labelEn": "Land category and permitted use"
        },
        {
          "id": "connection",
          "label": "Наличие подключения",
          "options": [
            "Есть действующее подключение или ТУ",
            "Есть предполагаемая точка подключения"
          ],
          "labelEn": "Grid connection status",
          "optionsEn": [
            "Existing connection or issued technical connection conditions",
            "Proposed connection point identified"
          ]
        },
        {
          "id": "reliability",
          "label": "Требуемая категория надежности электроснабжения",
          "options": [
            "Вторая категория",
            "Вторая категория + ДГУ",
            "Третья категория + ДГУ"
          ],
          "labelEn": "Required power supply reliability category (Russian classification)",
          "optionsEn": [
            "Category II",
            "Category II + diesel generator backup",
            "Category III + diesel generator backup"
          ]
        }
      ],
      "titleEn": "Site and power supply"
    },
    {
      "id": "equipment",
      "title": "Параметры ЦОДа",
      "fields": [
        {
          "id": "it_power",
          "label": "Мощность IT-оборудования, МВт",
          "type": "number",
          "maxLength": 13,
          "integerDigits": 9,
          "decimalDigits": 3,
          "labelEn": "IT equipment power demand, MW"
        },
        {
          "id": "racks",
          "label": "Количество стоек",
          "type": "number",
          "step": "1",
          "maxLength": 9,
          "integerDigits": 9,
          "decimalDigits": 0,
          "labelEn": "Number of racks"
        },
        {
          "id": "rack_power",
          "label": "Планируемая мощность на стойку, кВт",
          "type": "number",
          "maxLength": 13,
          "integerDigits": 9,
          "decimalDigits": 3,
          "labelEn": "Planned power per rack, kW"
        },
        {
          "id": "cooling",
          "label": "Предполагаемая система охлаждения",
          "options": [
            "Воздушная",
            "Жидкостная",
            "Комбинированная",
            "Нужна рекомендация"
          ],
          "labelEn": "Proposed cooling system",
          "optionsEn": [
            "Air cooling",
            "Liquid cooling",
            "Combined air and liquid cooling",
            "Recommendation needed"
          ]
        },
        {
          "id": "building",
          "label": "Исполнение ЦОДа",
          "options": [
            "Капитальное здание",
            "Модульное исполнение",
            "Нужна рекомендация"
          ],
          "labelEn": "Data center construction type",
          "optionsEn": [
            "Permanent building",
            "Modular construction",
            "Recommendation needed"
          ]
        },
        {
          "id": "comments",
          "label": "Дополнительные сведения и вопросы",
          "type": "textarea",
          "maxLength": 2000,
          "labelEn": "Additional information and questions"
        }
      ],
      "titleEn": "Data center specifications"
    },
    {
      "id": "contact",
      "title": "Контакты",
      "fields": [
        {
          "id": "company",
          "label": "Компания",
          "type": "text",
          "unknown": false,
          "maxLength": 200,
          "labelEn": "Company"
        },
        {
          "id": "name",
          "label": "Контактное лицо",
          "type": "text",
          "unknown": false,
          "maxLength": 100,
          "labelEn": "Contact name"
        },
        {
          "id": "role",
          "label": "Роль в проекте",
          "type": "text",
          "unknown": false,
          "maxLength": 100,
          "labelEn": "Role in the project"
        },
        {
          "id": "phone",
          "label": "Телефон",
          "type": "tel",
          "unknown": false,
          "maxLength": 30,
          "labelEn": "Phone number"
        },
        {
          "id": "email",
          "label": "Email для связи",
          "type": "email",
          "unknown": false,
          "maxLength": 254,
          "labelEn": "Contact email"
        }
      ],
      "titleEn": "Contact details"
    }
  ]
};
