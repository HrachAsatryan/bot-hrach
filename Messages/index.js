const { matcher } = require("../Lib");

const buildSimpleHandlers = () => {
  const mapping = [
    [
      ['hi Hrach', 'hey Hrach', 'hello Hrach', 'barev Hrach', 'բարև Հրաչ', 'հելլո Հրաչ'],
      'բարև'
    ],
    [
      ['hrach sus'],
      'ԽԻԵՍ ԲՈՉԿԱ ԳԼՈՐՈՒՄ ՎՐԵՍ!!!!'
    ],
    [
      ['kilo', 'kg', 'kilogram', 'կիլո', 'կգ', 'կիլոգրամ'],
      async (message) => {
        const orer = [
          'երեկ ',
          'էսօր ',
          'էն օրը '
        ];
        const tegher = [
          'տանը ',
          'ջիմում '
        ];
        const text = orer[Math.floor(Math.random()*orer.length)]+
          tegher[Math.floor(Math.random()*tegher.length)]+
          'կշռվեցի '+
          (Math.floor(Math.random() * (105 - 79) + 79)).toString() + ' կիլո էի';

        await message.reply(text);
      }
    ],
    [
      ['tonratun', 'qyabab', 'kebab', 'pizza', 'burger', 'lahmajo', 'lahmacun', 'shawarma', 'grill.am', 'քյաբաբ','պիցցա','բուրգեր','լահմաջո','շաուրմա','գրիլլ․ամ','թոնրատուն'],
      'կաինավ'
    ],
    [
      ['axper','ախպեր'],
      async (message) => {
        const janaxper = [
          'ջան ախպեր',
          'ոնց ախպեր',
          'բա ախպեր'
        ];
        await message.reply(janaxper[Math.floor(Math.random()*janaxper.length)])
      }
    ],
    [
      ['միբան','միբան', 'miban', 'miban', 'jackbox', 'ջեքբոքս', 'jackbox', 'ջեքբոքս', 'cs', 'ցս', 'fortnite', 'ֆորթնայթ'],
      async (message) => {
        return Promise.all([
          await message.react('➕'),
          await message.react('➖')
        ])
      }
    ],
    [
      ['gm', 'գմ'],
      async (message) => {
        return Promise.all([
          await message.react('🇬'),
          await message.react('🇲'),
          await message.react('<:baj:904686634518315019>')
        ])
      }
    ],
    [
      ['bg', 'gn', 'բգ', 'բգ'],
      async (message) => {
        return Promise.all([
          await message.react('🇬'),
          await message.react('🇳'),
          await message.react('<:gandz:798882493201252422>')
       ])
      }
    ],
    [
      ['aghaghay', 'աղաղայ'],
      async (message) => {
        return Promise.all([
          await message.react('🤝')
       ])
      }
    ],
    [
      ['նուպոգոդի', 'nupogodi'],
      async (message) => {
        await message.reply("https://imgur.com/HmgZq6E")
      }
    ],
    [
      (text) => text.match(/😍/i),
      async (message) => {
        let srtikachqerovAI = Math.floor(Math.random() * 3);
        return srtikachqerovAI === 1 && await message.reply("ջան ախպեր")
      }
    ],
    [
      ['lolik', 'pomidor', 'tomato', 'պոմիդոր', 'լոլիկ', '🍅'],
      async (message) => {
        await message.reply("ֆաք 🍅")
      }
    ],
    [
      ['lol','լոլ','լօլ'],
      async (message) => {
        await message.reply("ֆաք lol")
      }
    ],
    [
      (text) => text.match(/(?<=^|\P{L})(\.)(?=\P{L}|$)/),
      async (message) => {
        return Promise.all([
          await message.react('🤬')
        ])
      }
    ],
    [
      (text) => text === '/tusbomb',
      async (message) => {
        const tus = [
          'https://media.discordapp.net/attachments/1093110043886485574/1093156901182767175/message.png?width=900&height=198',
          'https://media.discordapp.net/attachments/1093110043886485574/1094003918910005340/message.png?width=900&height=140',
          'https://media.discordapp.net/attachments/1093110043886485574/1094003958588133496/message.png?width=900&height=140',
          'https://media.discordapp.net/attachments/1093110043886485574/1094004003752394882/message.png?width=900&height=204',
          'https://media.discordapp.net/attachments/1093110043886485574/1094004108740001852/message.png?width=900&height=140'
        ];
        let response = '';
        tus.forEach(link => {
          response += link;
          response += '\n';
        })
        await message.reply('sooooon ™')
      }
    ]
  ];

  return mapping.map(item => {
    let matcherFunc;
    let handlerFunc;
    const [ match, handler ] = item;

    if (typeof match === 'function') {
      matcherFunc = match;
    } else {
      const regexp = matcher(...match);
      matcherFunc = (text) => text.match(regexp)
    }

    if (typeof handler === 'string') {
      handlerFunc = async (message) => await message.reply(handler);
    } else {
      handlerFunc = handler;
    }
    return [
      matcherFunc,
      handlerFunc
    ]
  })
}

const handlers = buildSimpleHandlers();

const handleMessage = async (message) => {
  const content = message.content;
  try {
    await Promise.all(handlers.filter(item => {
      const [ match ] = item;
      return match(content);
    }).map(item => {
      const [ , handle ] = item;
      return handle(message);
    }));
  } catch (e) {
    console.log(e);
  }

}

module.exports = handleMessage;
