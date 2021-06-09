const router = require('express').Router();
const Banner = require('../../database/models/banner');

// /api/admin/dashboard
router.get('/dashboard', (req, res) => {
  // For testing the admin dashboard, change this line to your gmail
  if (req.user.email === 'connor.dipietro@gmail.com') {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

router.get('/banner', async (req, res) => {
  /*   const expires = Date.now() + exp time in ms;
  console.log(expires);
  Banner.create({
    expirationDate: expires,
    bannerMsg: 'This is an exipring test message 01111',
  }); */
  // 100000

  const bannerInDB = await Banner.find();
  if (bannerInDB[0]) return res.send(bannerInDB[0]);
  console.log(bannerInDB[0]);
  res.sendStatus(400);
});

module.exports = router;
/* 
        const bannerInDB = await Banner.find();
        if (!bannerInDB) {
          console.log('Banner not found');
          const stripeCustomer = await createCustomer({ email });
          const newUser = await User.create({
            email,
            id: sub,
            customer: {
              stripeId: stripeCustomer.id,
            },
          });
          return done(null, newUser);
        }
        console.log('Found user');
        return done(null, userInDB);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);




const bannerInDB = await Banner.find();
        if (!bannerInDB) {
          console.log('Banner not found');
          const stripeCustomer = await createCustomer({ email });
          const newUser = await User.create({
            email,
            id: sub,
            customer: {
              stripeId: stripeCustomer.id,
            },
          });
          return done(null, newUser);
        }
        console.log('Found user');
        return done(null, userInDB);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
 */
