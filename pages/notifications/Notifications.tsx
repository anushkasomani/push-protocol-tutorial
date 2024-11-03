import { useEffect, useState, useContext, useCallback } from 'react' ;
import { Web3Context } from '../context/web3Context';
import * as PushAPI from '@pushprotocol/restapi';
import { NotificationItem, chainNameType } from '@pushprotocol/uiweb';
import { Text } from '@chakra-ui/react';


const Notifications = () => {
  const account ='eip155:11155111:0x8dA7936deBca60c98A0F6Eb0142990027986f959'
  const [notifs, setNotifs] = useState<PushAPI.ParsedResponseType[]>();
  const loadNotifications = useCallback(async () => {
    try {
      const notifications = await PushAPI.user.getFeeds({
        user: account,
        env: 'staging'
      });
      console.log('feeds: ', notifications);
      setNotifs(notifications);
    } catch (e) {
      console.error(e);
    } 
  }, [account]);


  useEffect(() => {
    if (account) {
        loadNotifications();
    }
  }, [loadNotifications]);

  return (
      <div>
        <div>
          <div>
            <Text as='b' fontSize='xl'>Notifications: </Text>
            <div>
              {notifs ? (
                <div>
                  {notifs.map((oneNotification, i) => {
                  const { 
                    cta,
                    title,
                    message,
                    app,
                    icon,
                    image,
                    url,
                    blockchain,
                    secret,
                    notification
                  } = oneNotification;

                  return (
                    <NotificationItem
                      key={`notif-${i}`}
                      notificationTitle={secret ? notification['title'] : title}
                      notificationBody={secret ? notification['body'] : message}
                      cta={cta}
                      app={app}
                      icon={icon}
                      image={image}
                      url={url}
                      theme={'dark'}
                      chainName={blockchain as chainNameType}
                    />
                  );
                })}
                </div>
              ) 
              : null}
            </div>
            </div>
        </div>
      </div>
  );
}

export default Notifications;