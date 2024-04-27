import { Badge, Button } from 'antd';
import styles from './MyCard.module.css';
import { interfaceStatusList } from '@/enum/interfaceInfoEnum';

const MyCard = (props: any) => {
  const apilink = `/interface_info/${props.id}`;

  return (
    <div className={styles.card}>
      <img
        className={styles.cardimg}
        src="https://images.unsplash.com/photo-1610987630265-35804332a182?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
        alt=""
      />
      <div className={styles.cardinfo}>
        <div style={{ display: 'flex' }}>
          <h2 style={{marginBottom:'0px'}}>
            <a style={{ color: 'black' }} href={apilink}>
              {props.name}
            </a>
          </h2>
          <Button className={styles.button} size="small">{props.method}</Button>
        </div>
        <p style={{ marginBottom: '2px', marginTop: '7px' }}>{props.description}</p>
        <div className={styles.progress}></div>
      </div>
      <div
        style={{
          marginRight: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'absolute',
          left: '60%'
        }}
      >
        {/* <div style={{ color: 'rgba(66, 120, 228, 0.8)', marginBottom: '5px' }}>调用次数</div>
        <Badge color="#0075FF" count={1111} overflowCount={9999}></Badge> */}
        <div
          style={{
            minWidth: 200,
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <div style={{ marginRight: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ color: '#AAAAAA', marginBottom: '5px' }}>调用次数</div>
            <Badge color="#0075FF" count={111} overflowCount={9999}></Badge>
          </div>

          <div
            style={{
              width: '100px',
              marginTop:'10px'
            }}
          >
            {props && props.status === 0 ? (
              <Badge style={{color: '#AAAAAA'}}
                status={interfaceStatusList['0'].status}
                text={interfaceStatusList['0'].text}
              />
            ) : null}
           {props && props.status === 1 ? (
            <Badge 
            status={interfaceStatusList['1'].status}
            text={
              <span style={{color: '#000000'}}>
                {interfaceStatusList['1'].text}
              </span>
            }
          />
            ) : null}
          </div>
        </div>
      </div>

      <a key={props.id} href={apilink} className={styles.link}>
        查看详情
      </a>
    </div>
  );
};

export default MyCard;
