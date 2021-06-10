const router = require('express').Router();
const Banner = require('../../database/models/banner');

// /api/admin/dashboard
router.get('/dashboard', (req, res) => {
  // For testing the admin dashboard, change this line to your gmail
  if (req.user.email === process.env.ADMIN_USER) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

router.get('/banner', async (req, res) => {
  // Disasllows multiple banners to be scheduled right now
  const bannerInDB = await Banner.find();
  if (bannerInDB[0]) return res.send(bannerInDB[0]);
  // Send status 400 if no banner found in db;
  res.sendStatus(400);
});

module.exports = router;

router.post('/banner', async (req, res) => {
  console.log(req.body);

  const { expireTime, bannerMsg } = req.body;
  // Unrptoected route for testing, would need to verfiy admin eventually
  const result = await Banner.create({
    expirationDate: expireTime,
    bannerMsg,
  });

  if (result) return res.send({ stauts: 200, msg: 'Success!' });

  // Send error on error
  res.sendStatus(404);
});

/* 

 const expires = Date.now() + exp time in ms;



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
