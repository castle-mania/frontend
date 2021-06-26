import { EventEmitter } from 'events';
import { useEffect, useState } from 'react';
import api from '../request.js';

class KingdomStore extends EventEmitter {
  constructor() {
    super();
    this.kingdoms = {};
  }

  hasMember(id, memberId) {
    return this.kingdoms[id].members.some((member) => member.id === memberId);
  }

  async get(id) {
    if (id in this.kingdoms) return this.kingdoms[id];
    const res = await api.GET(`/kingdom/${id}`);
    this.kingdoms[id] = res.data;
    return res.data;
  }
}

const kingdomStore = new KingdomStore();

export function useKingdomState({ id }) {
  const [kingdom, setKingdomState] = useState(null);

  useEffect(async () => {
    const res = await kingdomStore.get(id);
    setKingdomState(res);
  }, []);

  return [kingdom, setKingdomState];
}

export default kingdomStore;
