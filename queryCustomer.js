const con = require('./DB');
const functions = {
    ShowCustomersTreats: (req, res) => {
        try {
            let id = req.params.Id
            const sqlQuery = `select * from corona.treats where IdCustomer=${id}`;
            con.query(sqlQuery, (err, result) => {
                if (err) {
                    res.status(404).send('the details are not correct');
                }
                else {
                    res.send(result);
                }
            })
        }
        catch (err) {
            res.sendStatus(500);
            res.send(err);
        }
    },
    AddCustomer: (req, res) => {
        try {
            const { FirstName, LastName, City, BirthDate, Phone, MobilePhone, AddressCustomer } = req.body;
            const sqlQuery = `insert into corona.customers (FirstName, LastName, City, BirthDate, Phone, MobilePhone,AddressCustomer,Active) 
            values('${FirstName}','${LastName}','${City}','${BirthDate.substring(0, 10)}','${Phone}','${MobilePhone}','${AddressCustomer}','1')`
            con.query(sqlQuery,
                (err, result) => {
                    if (err) {
                        res.status(404).send('the details are not correct');
                    }
                    else {
                        res.send(result);
                    }
                })
        }
        catch (err) {
            res.sendStatus(500);
            res.send(err);
        }
    },
    DeleteCustomer: (req, res) => {
        try {
            const id = req.params.Id;
            con.query(`UPDATE corona.customers 
            SET Active = '0'
            WHERE Id=${id}`, (err, result) => {
                if (err) {
                    res.status(404).send('the details are not correct');
                }
                else {
                    res.send(result);
                }
            })
        }
        catch (err) {
            res.sendStatus(500);
            res.send(err);
        }
    },
    UpdateCustomer: (req, res) => {
        try {
            con.query(`UPDATE corona.customers 
        SET FirstName='${req.params.FirstName}',LastName='${req.params.LastName}',City='${req.params.City}',BirthDate='${req.params.BirthDate.substring(0, 10)}',Phone='${req.params.Phone}',MobilePhone='${req.params.MobilePhone}',AddressCustomer='${req.params.Address}'
        WHERE Id=${req.params.Id};`, (err, result) => {
                if (err) {
                    res.status(404).send('the details are not correct');
                }
                else {
                    res.send(result);
                }
            })
        }
        catch (err) {
            res.sendStatus(500);
            res.send(err);
        }
    },
    ShowCustomers: (req, res) => {
        try {
            const id = req.params.Id;
            con.query(`select * from corona.customers where Active=1 `, (err, result) => {
                if (err) {
                    res.status(404).send(err);
                }
                else {
                    res.send(result);
                }
            });
        }
        catch (err) {
            res.sendStatus(500);
            res.send(err);
        }
    },
    ShowProducers: (req, res) => {
        try {
            const sqlQuery = `select * from corona.producers`;
            con.query(sqlQuery, (err, result) => {
                if (err) {
                    res.status(404).send(err);
                }
                else {
                    res.send(result);
                }
            });
        }
        catch (err) {
            res.sendStatus(500);
            res.send(err);
        }
    },
    ShowCustomer: (req, res) => {
        try {
            const id = parseInt(req.params.Id);
            const sqlQuery = `select * from corona.customers where Id=${id}`;
            con.query(sqlQuery, (err, result) => {
                if (err) {
                    res.status(404).send(err);
                }
                else {
                    res.send(result);
                }
            });
        }
        catch (err) {
            res.sendStatus(500);
            res.send(err);
        }
    },
    GetCustomerByPhone: (req, res) => {
        try {
            const phone = req.params.phone;
            const sqlQuery = `select Id from corona.customers where Phone=${phone} or MobilePhone=${phone}`;
            con.query(sqlQuery, (err, result) => {
                if (err) {
                    res.status(404).send(err);
                }
                else {
                    res.send(result);
                }
            });
        }
        catch (err) {
            res.sendStatus(500);
            res.send(err);
        }
    },
    GetSicksEachDay: (req, res) => {
        try {
            const sqlQuery = `select day(dateTreat) as dayT,count(*) as cnt from corona.treats
            where StatusTreat='חולה קורונה' and month(dateTreat)=month(CURDATE())
            group by day(dateTreat)`;
            con.query(sqlQuery, (err, result) => {
                if (err) {
                    res.status(404).send(err);
                }
                else {
                    res.send(result);
                }
            });
        }
        catch (err) {
            res.sendStatus(500);
            res.send(err);
        }
    },
    GetNotImmunized: (req, res) => {
        try {
            const sqlQuery = `select count(*) as cnt from corona.customers 
            where active=1 and Id not in(
            select distinct IdCustomer from corona.treats
            where statusTreat='קבלת חיסון ראשון' or statusTreat='קבלת חיסון שני'or statusTreat='קבלת חיסון שלישי' or statusTreat='קבלת חיסון רביעי')`;
            con.query(sqlQuery, (err, result) => {
                if (err) {
                    res.status(404).send(err);
                }
                else {
                    res.send(result);
                }
            });
        }
        catch (err) {
            res.sendStatus(500);
            res.send(err);
        }
    },
   
}
module.exports = functions
