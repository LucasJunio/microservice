import * as moment from 'moment'
import * as _ from 'lodash'

const formatDate = date => {
  return moment().utc().toDate
}

export default formatDate
