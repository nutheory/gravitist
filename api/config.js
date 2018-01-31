module.exports = {
  jwt: {
    secret: 'Fear!ess$pecia!istMighTyWor!ock',
  },
  sequelize: 'fear1ess$peci@lis!woundedKnigh!287',
  stripe: {
    test: {
      'secret_key': 'sk_test_5gYzjUmDaDh7pmO9ve5PU442',
      'publishable_key': 'pk_test_W90LuXm9KwqYqSwXgmGh0hLp'
    },
    development: {
      'secret_key': 'sk_test_5gYzjUmDaDh7pmO9ve5PU442',
      'publishable_key': 'pk_test_W90LuXm9KwqYqSwXgmGh0hLp'
    },
    production: {
      'secret_key': '',
      'publishable_key': ''
    }
  },
  stripe_production: {
    'secret_key': '',
    'publishable_key': ''
  },
  stripe_platform: {
    development: 'ca_BIQQRaLAZtZuz6c5rXDt1iKzIBA5CINl',
    production: 'ca_BIQQAFoAbsx5V7IK7wOa6rrFbjBnxil7'
  },
  google: 'AIzaSyCCyCNurvw6qHEi_KQme7LdQ-prmw_4Rgk',
  transloadit: {
    authKey    : '8251ad40aa3c11e79d2fc1426d116ee2',
    authSecret : '666c63aabed4c564fc0d733c06dfa1b6507b7aa0'
  },
  aws: {
    accessKeyId: 'AKIAJIBEGSDYXPQQVALQ',
    secretAccessKey: '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'
  },
  base_url: {
    test: 'http://eed9286a.ngrok.io',
    development: 'http://eed9286a.ngrok.io',
    production: 'https://homefilming.com'
  },
  assemblies: {
    test: {
      process: 'b599c120ff1811e799a69f0c49965a9a',
      process_video: 'f8bc5c70051b11e886c5c3c16ae9de84',
      video_overlay: '5c2787c0fcee11e784673bd946b497c6',
      avatar: 'a1c24960ae0a11e78ba4eb88b36fe012',
      logo: '7bfdc4d0b39f11e78e986f691eb30931',
      license: '8c7b2250ae0c11e7925d4b190411debf',
      insurance: '18e6ccc0ae1311e79280831a1922ea49',
      order_pilot: 'f9665a30ae0a11e781e037bc7eba28cc'
    },
    development: {
      process: 'b599c120ff1811e799a69f0c49965a9a',
      process_video: 'f8bc5c70051b11e886c5c3c16ae9de84',
      video_overlay: '5c2787c0fcee11e784673bd946b497c6',
      avatar: 'a1c24960ae0a11e78ba4eb88b36fe012',
      logo: '7bfdc4d0b39f11e78e986f691eb30931',
      license: '8c7b2250ae0c11e7925d4b190411debf',
      insurance: '18e6ccc0ae1311e79280831a1922ea49',
      order_pilot: 'f9665a30ae0a11e781e037bc7eba28cc'
    },
    production: {
      process: 'b599c120ff1811e799a69f0c49965a9a',
      process_video: 'f8bc5c70051b11e886c5c3c16ae9de84',
      video_overlay: '5c2787c0fcee11e784673bd946b497c6',
      avatar: 'ff56f780abfb11e7a140bf7692070f26',
      logo: '237c2540b39f11e7a8e8b74b684251cb',
      license: '354dd770ac0411e7a4fef76695c826a1',
      insurance: '7ceb6de0ac0411e7b21dcb4fb8b37f12',
      order_pilot: 'e1a82610aa9211e7899671180a934b48'
    }
  }
}
