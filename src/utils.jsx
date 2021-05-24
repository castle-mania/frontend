import React from 'react';

export function profileImage(url) {
  return (
    <img
      alt={url}
      style={{
        verticalAlign: 'middle',
        marginBottom: 1,
        marginRight: 10,
        borderRadius: 3,
        width: 20,
      }}
      src={url}
    />
  );
}

export function brandImage() {
  const url = 'https://cdn.discordapp.com/attachments/278201582997209089/840327064279711754/greengem_tilted.png';
  return (
    <img
      alt={url}
      style={{
        verticalAlign: 'middle',
        marginBottom: 4,
        marginRight: 10,
        borderRadius: 3,
        width: 20,
      }}
      src={url}
    />
  );
}

export function currency(cost) {
  const url = 'https://cdn.discordapp.com/attachments/278201582997209089/840327064279711754/greengem_tilted.png';
  return (
    <div className="currency">
      <img
        alt={url}
        style={{
          verticalAlign: 'middle',
          marginBottom: 4,
          marginRight: 2,
          borderRadius: 3,
          width: 20,
        }}
        src={url}
      />
      {cost}
    </div>
  );
}
