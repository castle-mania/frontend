import React, {useEffect} from 'react';
import {useParams} from 'react-router';
import VotingStatus from '../../components/VotingStatus';

export default function Vote() {
  const {referrer} = useParams();

  useEffect(() => {
    switch (referrer) {
      case 'topgg':
        window.open('https://top.gg/bot/757120026867138580/vote');
        break;
      case 'dbl':
      default:
        window.open('https://discordbotlist.com/bots/castle-mania/upvote');
        break;
    }
  }, []);

  return <VotingStatus />;
}
