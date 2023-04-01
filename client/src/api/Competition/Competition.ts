import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_NODE_URL}/competition`,
  });

  export const createCompetition = async ({entry_points, max_num_players, start_balance, start_time, end_time}) => {
    const data = {
        entry_points,
        max_num_players,
        start_balance,
        start_time,
        end_time
    };

    const result = await axiosInstance.post('/create', data)
        .then(res => {
            if (res.data.success) {
                return true;
            } else {
                return false;
            }
        })
        .catch(err => {
            console.error(err);
            return false;
        });

    return result;
}


const testCompetitionApiCall = async () => {

    const result = await axiosInstance.get('/competitions')
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.error(err);
            return false;
        });

    return result;
};


export {
    testCompetitionApiCall,
};
